const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const serviceAreasHTML = `
        <div class="footer-links">
          <h4 class="footer-heading">Service Areas</h4>
          <ul>
            <li><a href="marble-temple-ahmedabad.html">Ahmedabad</a></li>
            <li><a href="marble-temple-surat.html">Surat</a></li>
            <li><a href="marble-temple-vadodara.html">Vadodara</a></li>
            <li><a href="marble-temple-rajkot.html">Rajkot</a></li>
            <li><a href="marble-temple-banaskantha.html">Banaskantha</a></li>
            <li><a href="marble-temple-gujarat.html">Gujarat</a></li>
          </ul>
        </div>
`;

let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('marble-temple-ahmedabad.html')) {
    continue;
  }

  const targetStr = `        <div class="footer-contact">`;
  if (content.includes(targetStr)) {
    content = content.replace(targetStr, serviceAreasHTML + '\n' + targetStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer in ${file}`);
    updatedCount++;
  }
}
console.log(`Total files updated with Service Areas: ${updatedCount}`);
