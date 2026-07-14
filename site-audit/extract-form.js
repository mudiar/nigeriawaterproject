const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'contact.html'), 'utf8');
const m = html.match(/id="form-context-[^"]*"[^>]*>\s*(\{[\s\S]*?\})\s*<\/script>/);
if (m) {
  const ctx = JSON.parse(m[1]);
  console.log(JSON.stringify(ctx.form?.fields || ctx.fields || ctx, null, 2));
}
