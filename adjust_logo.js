const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const stylePath = path.join(rootDir, 'css', 'style.css');

let styleContent = fs.readFileSync(stylePath, 'utf8');

// Replace .logo-icon
styleContent = styleContent.replace(
`.logo-icon {
  width: 56px;
  height: 56px;
}`,
`.logo-icon {
  width: 80px;
  height: 80px;
}`
);

// Replace .logo-container gap just in case
styleContent = styleContent.replace(
`.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}`,
`.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}`
);

// Replace .logo-text and .logo-subtext
styleContent = styleContent.replace(
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
}`,
`.logo-text {
  font-family: var(--font-label);
  font-size: 1.6rem;
  color: var(--color-white);
  letter-spacing: 4px;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
}
.logo-subtext {
  display: block;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 400;
  opacity: 0.9;
  letter-spacing: 9px;
  text-transform: uppercase;
  margin-top: 2px;
  margin-right: -9px; /* Offset the extra letter-spacing on the last character */
}`
);

fs.writeFileSync(stylePath, styleContent);
console.log("Updated style.css");

// Update responsive.css
const respPath = path.join(rootDir, 'css', 'responsive.css');
let respContent = fs.readFileSync(respPath, 'utf8');

respContent = respContent.replace(
`.logo-icon {
    width: 40px;
    height: 40px;
  }`,
`.logo-icon {
    width: 55px;
    height: 55px;
  }`
);

fs.writeFileSync(respPath, respContent);
console.log("Updated responsive.css");
