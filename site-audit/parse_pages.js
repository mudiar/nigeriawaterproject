const fs = require('fs');
const path = require('path');

const AUDIT_DIR = __dirname;
const PAGES = {
  iguovbiobo: 'https://www.nigeriawaterproject.org/iguovbiobo',
  uvbevillage: 'https://www.nigeriawaterproject.org/uvbevillage',
  photos: 'https://www.nigeriawaterproject.org/photos',
  donate: 'https://www.nigeriawaterproject.org/donate',
  contact: 'https://www.nigeriawaterproject.org/contact',
  'new-dropdown': 'https://www.nigeriawaterproject.org/new-dropdown',
};

const THEME_COLORS = {
  white: 'rgb(251, 251, 251)',
  black: 'rgb(52, 47, 47)',
  light: 'rgb(232, 232, 232)',
  'dark-bold': 'rgb(52, 47, 47)',
  dark: 'rgb(79, 76, 76)',
  'bright-inverse': 'rgb(251, 251, 251)',
  '': 'transparent/default',
};

function stripQuery(url) {
  return url.split('?')[0].replace(/&quot;.*$/, '').replace(/\\$/, '');
}

function decodeHtml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\s+/g, (m, offset, s) => (s[offset - 1] === '\n' || s[offset + m.length] === '\n' ? ' ' : ' '))
    .trim();
}

function extractMainContent(html) {
  const mainMatch = html.match(/<main[^>]*id="page"[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    const footerIdx = mainMatch[1].lastIndexOf('fe-67137859ccf3f0398022af6d');
    if (footerIdx > 0) return mainMatch[1].slice(0, footerIdx);
    return mainMatch[1];
  }
  return html;
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? decodeHtml(m[1]) : '';
}

function extractHeadings(content) {
  const headings = [];
  const re = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    let text = m[2].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
    text = decodeHtml(text);
    if (text && !/^(NIGERIA WATER PROJECT|Location|Contact)$/i.test(text)) {
      headings.push({ level: parseInt(m[1][1]), text });
    }
  }
  return headings;
}

function extractParagraphs(content) {
  const paragraphs = [];
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    const text = decodeHtml(m[1].replace(/<[^>]+>/g, ''));
    if (text && text.length > 1 && !/^(STANFORD|TAMPA|nigeriawaterproject|mudiar|ogbereuben)/i.test(text)) {
      paragraphs.push(text);
    }
  }
  return paragraphs;
}

function extractButtons(content) {
  const labels = new Set();
  const re = /class="[^"]*sqs-block-button[^"]*"[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    const text = decodeHtml(m[1].replace(/<[^>]+>/g, ''));
    if (text) labels.add(text);
  }
  const re2 = /class="dbox-donation-button"[^>]*>[\s\S]*?<span[^>]*>([^<]*)<\/span>/gi;
  while ((m = re2.exec(content)) !== null) {
    if (m[1]) labels.add(decodeHtml(m[1]));
  }
  return [...labels];
}

function extractFaqs(html) {
  const faqs = [];
  const re = /class="accordion-item__title">([^<]*)<[\s\S]*?class="[\s\S]*?accordion-item__description[\s\S]*?>([\s\S]*?)<\/div>\s*<\/div>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    faqs.push({
      question: decodeHtml(m[1]),
      answer: decodeHtml(m[2].replace(/<[^>]+>/g, '')),
    });
  }
  return faqs;
}

function extractImages(html) {
  const urls = new Set();
  const re = /https:\/\/images\.squarespace-cdn\.com\/content\/v1\/[^\s"'<>?\\]+/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const clean = stripQuery(m[0]);
    if (!clean.endsWith('Logo.png') && !clean.endsWith('favicon.ico')) {
      urls.add(clean);
    }
  }
  return [...urls].sort();
}

function extractVideos(html) {
  const videos = [];
  const re = /data-config-video="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const decoded = m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    try {
      videos.push({ source: 'data-config-video', config: JSON.parse(decoded) });
    } catch {
      videos.push({ source: 'data-config-video', raw: decoded });
    }
  }
  return videos;
}

function extractLayout(html) {
  const sections = [];
  const re = /<section[^>]*data-section-id="([^"]*)"[^>]*data-section-theme="([^"]*)"[^>]*>/gi;
  let m;
  let i = 0;
  while ((m = re.exec(html)) !== null) {
    const theme = m[2];
    const sec = {
      index: i++,
      sectionId: m[1],
      sectionTheme: theme || 'default',
      backgroundColorRgb: THEME_COLORS[theme] || THEME_COLORS[''],
    };
    const chunk = html.slice(m.index, m.index + 2000);
    const overlay = chunk.match(/section-background-overlay[^>]*style="opacity:\s*([^"]+)"/);
    if (overlay) sec.backgroundOverlayOpacity = overlay[1];
    const hasFluid = chunk.includes('fluid-engine');
    if (hasFluid) sec.layout = 'fluid-engine (multi-column grid)';
    sections.push(sec);
  }
  return {
    sectionCount: sections.length,
    sections,
    maxPageWidth: '1400px',
    pagePadding: '4vw',
    transparentHeader: html.includes('tweak-transparent-header'),
    headerWidth: 'Inset',
    fonts: ['Anton (headings)', 'Epilogue (body)'],
  };
}

function extractForms(html) {
  const forms = [];
  const ctxRe = /id="form-context-[^"]*"[^>]*>\s*(\{[\s\S]*?\})\s*<\/script>/gi;
  let m;
  while ((m = ctxRe.exec(html)) !== null) {
    try {
      const ctx = JSON.parse(m[1]);
      const fields = (ctx.form || ctx.fields || []).map((f) => ({
        id: f.id,
        type: f.type,
        title: f.title || f.label || '',
        required: f.required || false,
        options: f.options || undefined,
      }));
      forms.push({
        formId: ctx.formId || ctx.collectionId,
        fields,
        submitLabel: 'Submit',
        storageNote: ctx.useLightbox ? 'lightbox form' : 'inline form',
      });
    } catch {}
  }

  const formRe = /<form[^>]*>([\s\S]*?)<\/form>/gi;
  while ((m = formRe.exec(html)) !== null) {
    const fields = [];
    const fieldRe = /<(input|textarea|select)[^>]*>/gi;
    let fm;
    while ((fm = fieldRe.exec(m[1])) !== null) {
      const tag = fm[0];
      fields.push({
        tag: fm[1],
        type: tag.match(/type="([^"]*)"/)?.[1] || fm[1],
        name: tag.match(/name="([^"]*)"/)?.[1] || '',
        placeholder: tag.match(/placeholder="([^"]*)"/)?.[1] || '',
        required: tag.includes('required'),
      });
    }
    if (fields.length) forms.push({ fields, submitLabel: 'Submit' });
  }
  return forms;
}

function extractExternalLinks(html) {
  const links = [];
  const seen = new Set();
  const re = /<a[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (href.includes('nigeriawaterproject.org') || href.includes('squarespace.com')) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    const text = decodeHtml(m[2].replace(/<[^>]+>/g, '')) || href;
    links.push({ href, text });
  }
  return links;
}

function extractProjectsDropdown(html) {
  const items = [];
  const re = /<a\s+href="(\/[^"]+)"\s*>([^<]*)<\/a>/gi;
  const folderContent = html.match(/header-nav-folder-content[^>]*id="projects"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
  if (folderContent) {
    let m;
    while ((m = re.exec(folderContent[1])) !== null) {
      items.push({ label: decodeHtml(m[2]), href: m[1] });
    }
  }
  return items;
}

function extractScrollingText(html) {
  const items = [];
  const re = /"sectionTitle"\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const decoded = m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>');
    const text = decodeHtml(decoded.replace(/<[^>]+>/g, ''));
    if (text) items.push(text);
  }
  return items;
}

function parsePage(slug, url) {
  const htmlPath = path.join(AUDIT_DIR, `${slug}.html`);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const content = extractMainContent(html);

  const result = {
    url,
    slug,
    seoTitle: extractTitle(html),
    visibleText: {
      headings: extractHeadings(content),
      paragraphs: extractParagraphs(content),
      buttonLabels: extractButtons(html),
      scrollingText: extractScrollingText(html),
      faqs: extractFaqs(html),
    },
    imageUrls: extractImages(html),
    videos: extractVideos(html),
    layout: extractLayout(html),
    forms: extractForms(html),
    externalLinks: extractExternalLinks(html),
  };

  return result;
}

const homeHtml = fs.readFileSync(path.join(AUDIT_DIR, 'home.html'), 'utf8');

const output = {
  auditDate: '2026-07-12',
  source: 'HTML crawl (Squarespace server-rendered; browser MCP unavailable in this session)',
  themeColorMap: THEME_COLORS,
  projectsDropdown: extractProjectsDropdown(homeHtml),
  pages: {},
};

for (const [slug, url] of Object.entries(PAGES)) {
  output.pages[slug] = parsePage(slug, url);
}

const outPath = path.join(AUDIT_DIR, 'page-content.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log('Done');
