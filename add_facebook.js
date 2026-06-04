const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('facebook.com/profile.php?id=61590641969646')) {
    console.log(`${file} already updated`);
    continue;
  }

  const fbLink = `<a href="https://www.facebook.com/profile.php?id=61590641969646" target="_blank" aria-label="Facebook" style="display:inline-block; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-facebook" style="font-size:1.5rem; color:var(--color-primary)"></i></a>\n            `;

  const searchStr = `<a href="https://www.instagram.com/gabbarwalimarblestone/"`;
  
  if (content.includes(searchStr)) {
    content = content.replace(searchStr, fbLink + searchStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  } else {
    console.log(`Instagram link not found in ${file}`);
  }
}
console.log(`Total updated: ${updatedCount}`);
