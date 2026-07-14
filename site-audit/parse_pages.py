#!/usr/bin/env python3
"""Parse Squarespace HTML pages into structured audit JSON."""
import json
import re
import html as html_lib
from pathlib import Path
from urllib.parse import urlparse, urlunparse

try:
    from bs4 import BeautifulSoup
except ImportError:
    import subprocess
    subprocess.check_call(["pip", "install", "beautifulsoup4", "lxml", "-q"])
    from bs4 import BeautifulSoup

AUDIT_DIR = Path(__file__).parent
PAGES = {
    "iguovbiobo": "https://www.nigeriawaterproject.org/iguovbiobo",
    "uvbevillage": "https://www.nigeriawaterproject.org/uvbevillage",
    "photos": "https://www.nigeriawaterproject.org/photos",
    "donate": "https://www.nigeriawaterproject.org/donate",
    "contact": "https://www.nigeriawaterproject.org/contact",
    "new-dropdown": "https://www.nigeriawaterproject.org/new-dropdown",
}

HOME_URL = "https://www.nigeriawaterproject.org/"


def strip_query(url: str) -> str:
    if not url:
        return url
    parsed = urlparse(url)
    return urlunparse((parsed.scheme, parsed.netloc, parsed.path, "", "", ""))


def clean_text(text: str) -> str:
    if not text:
        return ""
    text = html_lib.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def get_main_content(soup: BeautifulSoup):
    main = soup.find("main", id="page")
    if main:
        return main
    return soup.find("div", class_="page-section") or soup.body


def extract_visible_text(main) -> dict:
    """Extract headings, paragraphs, buttons, FAQs preserving order."""
    result = {
        "headings": [],
        "paragraphs": [],
        "buttonLabels": [],
        "faqs": [],
        "allTextBlocks": [],
    }

    skip_classes = {"header-nav", "footer", "header-menu", "Mobile-bar", "sqs-announcement-bar"}

    for el in main.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote", "figcaption"]):
        # skip nav/footer
        if any(el.find_parent(class_=re.compile(c, re.I)) for c in ["header", "footer", "Header", "Footer"]):
            parent = el
            in_nav = False
            for _ in range(10):
                parent = parent.parent
                if parent is None:
                    break
                cls = " ".join(parent.get("class", []))
                if "header-nav" in cls or "footer" in cls.lower() or "Header-nav" in cls:
                    in_nav = True
                    break
            if in_nav:
                continue

        text = clean_text(el.get_text(separator=" ", strip=True))
        if not text or len(text) < 2:
            continue

        tag = el.name
        if tag.startswith("h"):
            result["headings"].append({"level": int(tag[1]), "text": text})
        elif tag == "p":
            result["paragraphs"].append(text)
        elif tag == "li":
            # FAQ items often in accordion
            parent_acc = el.find_parent(class_=re.compile("accordion|faq", re.I))
            if parent_acc:
                result["faqs"].append(text)
            else:
                result["allTextBlocks"].append(text)
        else:
            result["allTextBlocks"].append(text)

    # Buttons
    for btn in main.find_all(["a", "button"], class_=re.compile("sqs-block-button|button|btn", re.I)):
        text = clean_text(btn.get_text(strip=True))
        if text and text not in result["buttonLabels"]:
            result["buttonLabels"].append(text)

    for btn in main.find_all("a", class_=re.compile("sqs-button-element", re.I)):
        text = clean_text(btn.get_text(strip=True))
        if text and text not in result["buttonLabels"]:
            result["buttonLabels"].append(text)

    # Accordion / FAQ blocks
    for acc in main.find_all(class_=re.compile("accordion-item|sqs-block-accordion", re.I)):
        title = acc.find(class_=re.compile("accordion-item__title|accordion-title", re.I))
        desc = acc.find(class_=re.compile("accordion-item__description|accordion-content", re.I))
        if title:
            faq_entry = {"question": clean_text(title.get_text(strip=True))}
            if desc:
                faq_entry["answer"] = clean_text(desc.get_text(separator=" ", strip=True))
            result["faqs"].append(faq_entry)

    return result


def extract_images(soup: BeautifulSoup) -> list:
    urls = set()
    for img in soup.find_all("img"):
        for attr in ["src", "data-src", "data-image", "data-image-focal-point"]:
            val = img.get(attr, "")
            if "squarespace-cdn.com" in str(val):
                urls.add(strip_query(val.split(" ")[0]))
        srcset = img.get("srcset", "")
        for part in srcset.split(","):
            u = part.strip().split(" ")[0]
            if "squarespace-cdn.com" in u:
                urls.add(strip_query(u))

    for el in soup.find_all(style=True):
        for m in re.finditer(r"url\(['\"]?(https?://images\.squarespace-cdn\.com[^)'\"]+)", el["style"]):
            urls.add(strip_query(m.group(1)))

    for el in soup.find_all(attrs={"data-image": True}):
        u = el.get("data-image", "")
        if "squarespace-cdn.com" in u:
            urls.add(strip_query(u))

    # background-image in data attributes
    html_str = str(soup)
    for m in re.finditer(r"https://images\.squarespace-cdn\.com/content/v1/[^\s\"'<>?]+", html_str):
        urls.add(strip_query(m.group(0)))

    return sorted(urls)


def extract_videos(soup: BeautifulSoup) -> list:
    videos = []
    html_str = str(soup)

    for el in soup.find_all(attrs={"data-config-video": True}):
        try:
            cfg = json.loads(el["data-config-video"])
            videos.append({"source": "data-config-video", "config": cfg})
        except json.JSONDecodeError:
            videos.append({"source": "data-config-video", "raw": el["data-config-video"]})

    for m in re.finditer(r'"alexandriaUrl"\s*:\s*"([^"]+)"', html_str):
        videos.append({"alexandriaUrl": m.group(1).replace("\\/", "/")})

    for m in re.finditer(r'"videoUrl"\s*:\s*"([^"]+)"', html_str):
        videos.append({"videoUrl": m.group(1).replace("\\/", "/")})

    for iframe in soup.find_all("iframe"):
        src = iframe.get("src", "")
        if src and ("youtube" in src or "vimeo" in src or "squarespace" in src):
            videos.append({"iframeSrc": src})

    # dedupe
    seen = set()
    unique = []
    for v in videos:
        key = json.dumps(v, sort_keys=True)
        if key not in seen:
            seen.add(key)
            unique.append(v)
    return unique


def extract_layout(soup: BeautifulSoup) -> dict:
    sections = []
    main = get_main_content(soup)
    for i, sec in enumerate(main.find_all("section", class_=re.compile("page-section", re.I))):
        info = {"index": i}
        classes = sec.get("class", [])
        info["classes"] = classes

        # background color from data attributes or inline style
        bg = sec.get("data-section-theme") or sec.get("data-section-id")
        if bg:
            info["dataSectionTheme"] = bg

        style = sec.get("style", "")
        bg_match = re.search(r"background(?:-color)?:\s*([^;]+)", style, re.I)
        if bg_match:
            info["backgroundColor"] = bg_match.group(1).strip()

        # Check for background image wrapper
        bg_div = sec.find(class_=re.compile("section-background|background-image", re.I))
        if bg_div:
            bg_style = bg_div.get("style", "")
            m = re.search(r"background(?:-color)?:\s*([^;]+)", bg_style, re.I)
            if m:
                info["backgroundColor"] = m.group(1).strip()

        # Column layout
        content = sec.find(class_=re.compile("content-wrapper|section-content", re.I))
        if content:
            cols = content.find_all(class_=re.compile("sqs-col|fluid-engine", re.I))
            if cols:
                info["hasColumns"] = True
                info["columnCount"] = len(cols)

        layout_type = None
        for c in classes:
            if "layout-engine" in c:
                layout_type = c
        if layout_type:
            info["layoutType"] = layout_type

        sections.append(info)

    return {
        "sectionCount": len(sections),
        "sections": sections[:20],
        "maxPageWidth": "1400px",
        "pagePadding": "4vw",
        "transparentHeader": True,
    }


def extract_forms(soup: BeautifulSoup) -> list:
    forms = []
    for form in soup.find_all("form"):
        fields = []
        for inp in form.find_all(["input", "textarea", "select"]):
            ftype = inp.name
            field = {
                "tag": ftype,
                "type": inp.get("type", ftype),
                "name": inp.get("name", ""),
                "id": inp.get("id", ""),
                "placeholder": inp.get("placeholder", ""),
                "required": inp.has_attr("required"),
            }
            label = form.find("label", attrs={"for": inp.get("id")})
            if label:
                field["label"] = clean_text(label.get_text(strip=True))
            fields.append(field)

        # Squarespace form blocks use data attributes
        form_block = form.find_parent(class_=re.compile("form-block", re.I))
        submit = form.find(["button", "input"], type="submit")
        forms.append({
            "action": form.get("action", ""),
            "method": form.get("method", "GET"),
            "fields": fields,
            "submitLabel": clean_text(submit.get_text(strip=True)) if submit else "Submit",
        })
    return forms


def extract_external_links(soup: BeautifulSoup) -> list:
    links = []
    domain = "nigeriawaterproject.org"
    for a in soup.find_all("a", href=True):
        href = a["href"]
        text = clean_text(a.get_text(strip=True))
        if not href.startswith("http"):
            continue
        if domain in href:
            continue
        links.append({"href": href, "text": text})

    # dedupe by href
    seen = set()
    unique = []
    for l in links:
        if l["href"] not in seen:
            seen.add(l["href"])
            unique.append(l)
    return unique


def extract_nav_dropdown(soup: BeautifulSoup) -> list:
    """Extract Projects dropdown submenu items."""
    items = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        text = clean_text(a.get_text(strip=True))
        # submenu items are village pages
        if any(v in href for v in ["iguovbiobo", "uvbevillage", "ebueneki", "urhokuosa", "new-dropdown"]):
            if text and len(text) > 2:
                items.append({"label": text, "href": href})

    # Also look for folder dropdown structure
    for folder in soup.find_all(class_=re.compile("header-nav-folder|folder-item", re.I)):
        for a in folder.find_all("a", href=True):
            text = clean_text(a.get_text(strip=True))
            href = a["href"]
            if text:
                items.append({"label": text, "href": href})

    # dedupe
    seen = set()
    unique = []
    for item in items:
        key = (item["label"], item["href"])
        if key not in seen:
            seen.add(key)
            unique.append(item)
    return unique


def parse_page(slug: str, url: str) -> dict:
    html_path = AUDIT_DIR / f"{slug}.html"
    if not html_path.exists():
        return {"url": url, "error": f"HTML file not found: {html_path}"}

    html = html_path.read_text(encoding="utf-8", errors="replace")
    soup = BeautifulSoup(html, "lxml")

    title_tag = soup.find("title")
    seo_title = clean_text(title_tag.get_text()) if title_tag else ""

    main = get_main_content(soup)

    return {
        "url": url,
        "slug": slug,
        "seoTitle": seo_title,
        "visibleText": extract_visible_text(main),
        "imageUrls": extract_images(soup),
        "videos": extract_videos(soup),
        "layout": extract_layout(soup),
        "forms": extract_forms(soup),
        "externalLinks": extract_external_links(soup),
    }


def main():
    output = {
        "auditDate": "2026-07-12",
        "source": "HTML crawl (Squarespace server-rendered)",
        "projectsDropdown": [],
        "pages": {},
    }

    home_path = AUDIT_DIR / "home.html"
    if home_path.exists():
        home_soup = BeautifulSoup(home_path.read_text(encoding="utf-8", errors="replace"), "lxml")
        output["projectsDropdown"] = extract_nav_dropdown(home_soup)

    for slug, url in PAGES.items():
        output["pages"][slug] = parse_page(slug, url)

    out_path = AUDIT_DIR / "page-content.json"
    out_path.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {out_path}")
    print(f"Pages: {len(output['pages'])}")
    print(f"Projects dropdown items: {len(output['projectsDropdown'])}")


if __name__ == "__main__":
    main()
