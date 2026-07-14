const fs = require('fs');
const path = require('path');

const THEME = {
  white: 'rgb(251, 251, 251)',
  black: 'rgb(52, 47, 47)',
  light: 'rgb(232, 232, 232)',
  'dark-bold': 'rgb(52, 47, 47)',
  dark: 'rgb(79, 76, 76)',
  'bright-inverse': 'rgb(251, 251, 251)',
  bright: 'rgb(251, 251, 251)',
  'light-bold': 'rgb(232, 232, 232)',
  '': 'transparent/default',
};

function extractSections(html) {
  const sections = [];
  const re = /<section[\s\S]*?data-section-theme="([^"]*)"[\s\S]*?data-section-id="([^"]*)"[\s\S]*?class='([^']*page-section[^']*)'/gi;
  let m;
  let i = 0;
  while ((m = re.exec(html)) !== null) {
    const theme = m[1];
    const chunk = m[0];
    const sec = {
      index: i++,
      sectionId: m[2],
      sectionTheme: theme || 'default',
      backgroundColorRgb: THEME[theme] || THEME[''],
      classes: m[3].replace(/\s+/g, ' ').trim().slice(0, 200),
    };
    if (chunk.includes('full-bleed-section')) sec.fullBleed = true;
    if (chunk.includes('section-height--large')) sec.height = 'large';
    if (chunk.includes('content-width--wide')) sec.contentWidth = 'wide';
    if (chunk.includes('has-background')) sec.hasBackgroundImage = true;
    if (chunk.includes('fluid-engine')) sec.layout = 'fluid-engine grid';
    const overlay = chunk.match(/section-background-overlay[^>]*style="opacity:\s*([^"]+)"/);
    if (overlay) sec.backgroundOverlayOpacity = overlay[1];
    sections.push(sec);
  }
  return sections;
}

const jsonPath = path.join(__dirname, 'page-content.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.themeColorMap = THEME;

const pageSections = {
  iguovbiobo: extractSections(fs.readFileSync(path.join(__dirname, 'iguovbiobo.html'), 'utf8')),
  uvbevillage: extractSections(fs.readFileSync(path.join(__dirname, 'uvbevillage.html'), 'utf8')),
  photos: extractSections(fs.readFileSync(path.join(__dirname, 'photos.html'), 'utf8')),
  donate: extractSections(fs.readFileSync(path.join(__dirname, 'donate.html'), 'utf8')),
  contact: extractSections(fs.readFileSync(path.join(__dirname, 'contact.html'), 'utf8')),
  'new-dropdown': extractSections(fs.readFileSync(path.join(__dirname, 'new-dropdown.html'), 'utf8')),
};

for (const [slug, sections] of Object.entries(pageSections)) {
  if (data.pages[slug]) {
    data.pages[slug].layout.sections = sections;
    data.pages[slug].layout.sectionCount = sections.length;
  }
}

// Contact page fixes
data.pages.contact.visibleText.headings = [{ level: 1, text: 'Contact ' }];
data.pages.contact.visibleText.paragraphs = [
  'For any sort of questions, concerns, collaborations concerns, or all-around inquires',
  'mudiar@stanford.edu',
];
data.pages.contact.forms = [{
  formId: '67137859ccf3f0398022af03',
  formName: 'New Form 2 3',
  submitLabel: 'SEND',
  successMessage: 'Thank you!',
  captchaEnabled: true,
  fields: [
    { type: 'name', title: 'Name', required: true, subfields: ['First Name', 'Last Name'] },
    { type: 'email', title: 'Email', required: true },
    { type: 'textarea', title: 'Message', required: true },
  ],
}];
data.pages.contact.layout.notes = 'Two-column layout: left text + form, right hero image';

// Uvbe heading preserve line break
data.pages.uvbevillage.visibleText.headings[0].text = 'Thanks to\nYOU guys';

// Donate page enhancements
data.pages.donate.forms = [{
  type: 'Squarespace Donation Block',
  suggestedAmounts: ['$25', '$50', '$100', '$250', '$500', 'Custom Amount'],
  currencySelector: true,
  submitLabel: 'Donate',
  externalFallback: 'https://donorbox.org/nigeria-water-project?default_interval=m',
}];
data.pages.donate.donorboxEmbed = {
  script: 'https://donorbox.org/install-popup-button.js',
  buttonHref: 'https://donorbox.org/nigeria-water-project?default_interval=m',
  buttonStyle: { background: 'rgb(133, 0, 1)', color: 'rgb(255, 255, 255)', borderRadius: '5px' },
};
data.pages.donate.visibleText.scrollingText = [
  'Why give?',
  'Your donation helps fund borehole projects that deliver safe, drinkable water to underserved communities in Nigeria.',
  '100% of donations go toward water infrastructure, maintenance, and sustainability efforts, ensuring every dollar creates real change.',
  "We don't just build boreholes—we implement long-term water solutions, empowering local communities to maintain and manage their resources.",
  'We provide regular updates, project reports, and impact stories, so you see exactly how your support is making a difference.',
  'As a 501(c)(3) nonprofit, all donations are tax-deductible, making your generosity even more rewarding.',
  'Every donation, big or small, is a step closer in transforming lives through clean water!',
];

// iguovbiobo layout notes
data.pages.iguovbiobo.layout.notes = 'Hero (black bg, large) → image gallery → text (bright-inverse) → footer (light)';

// photos layout
data.pages.photos.layout.notes = 'Hero title centered → 5 gallery sections with h3 labels, each with image grid';

// new-dropdown note - this is Urhokuosa page (General 5)
data.pages['new-dropdown'].pageTitle = 'Urhokuosa Village (slug: new-dropdown, also /urhokuosa)';
data.pages['new-dropdown'].layout.notes = 'Hero text → video → image gallery → footer';

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Enhanced page-content.json');
