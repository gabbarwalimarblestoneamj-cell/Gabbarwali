const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('rel="icon"') || content.includes('favicon.ico')) {
    console.log(`${file} already has a favicon`);
    continue;
  }

  const faviconTag = `  <link rel="icon" href="favicon.ico" type="image/x-icon">\n</head>`;
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', faviconTag);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  } else {
    console.log(`</head> not found in ${file}`);
  }
}
console.log(`Total updated: ${updatedCount}`);
