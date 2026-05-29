const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';

// Update HTML files
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<span class="logo-text">Gabbarwali Marble Stone<\/span>/g, '<span class="logo-text">Gabbarwali<span class="logo-subtext">Marble Stone</span></span>');
  fs.writeFileSync(filePath, content);
  console.log(`Updated HTML: ${file}`);
}

// Update style.css
const stylePath = path.join(rootDir, 'css', 'style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');
styleContent = styleContent.replace(
`.logo-icon {
  width: 32px;
  height: 32px;
}`,
`.logo-icon {
  width: 56px;
  height: 56px;
}`
);

styleContent = styleContent.replace(
`.logo-text {
  font-family: var(--font-label);
  font-size: 1.25rem;
  color: var(--color-white);
  letter-spacing: 1px;
}`,
`.logo-text {
  font-family: var(--font-label);
  font-size: 1.4rem;
  color: var(--color-white);
  letter-spacing: 1px;
  line-height: 1.1;
  display: inline-block;
}
.logo-subtext {
  display: block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 300;
  opacity: 0.8;
  letter-spacing: 0.5px;
}`
);
fs.writeFileSync(stylePath, styleContent);
console.log("Updated style.css");

// Update responsive.css
const respPath = path.join(rootDir, 'css', 'responsive.css');
let respContent = fs.readFileSync(respPath, 'utf8');
respContent = respContent.replace(
`.logo-icon {
    width: 24px;
    height: 24px;
  }`,
`.logo-icon {
    width: 40px;
    height: 40px;
  }`
);
fs.writeFileSync(respPath, respContent);
console.log("Updated responsive.css");
