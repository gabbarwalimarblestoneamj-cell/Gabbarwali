const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const oldBlock = `<div style="display:flex; gap:1rem;">
            <a href="https://wa.me/919998914607" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp" style="font-size:1.5rem; color:var(--color-primary)"></i></a>
            <a href="https://maps.google.com/?q=8VH4+4GH,+Ambaji,+Gujarat" target="_blank" aria-label="Google Maps"><i class="fas fa-map-marker-alt" style="font-size:1.5rem; color:var(--color-primary)"></i></a>
          </div>`;

const newBlock = `<div style="display:flex; gap:1.25rem; margin-top: 1rem;">
            <a href="https://wa.me/919998914607" target="_blank" aria-label="WhatsApp" style="display:inline-block; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-whatsapp" style="font-size:1.5rem; color:var(--color-primary)"></i></a>
            <a href="https://www.instagram.com/gabbarwalimarblestone/" target="_blank" aria-label="Instagram" style="display:inline-block; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-instagram" style="font-size:1.5rem; color:var(--color-primary)"></i></a>
            <a href="https://share.google/TbwE7Ah9so9e56huK" target="_blank" aria-label="Google My Business" style="display:inline-block; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-google" style="font-size:1.5rem; color:var(--color-primary)"></i></a>
            <a href="https://maps.google.com/?q=8VH4+4GH,+Ambaji,+Gujarat" target="_blank" aria-label="Google Maps" style="display:inline-block; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'"><i class="fas fa-map-marker-alt" style="font-size:1.5rem; color:var(--color-primary)"></i></a>
          </div>`;

let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We need to do a slightly flexible replace because of potential whitespace changes
  // Let's use a regex that matches the div with whatsapp and google maps
  const regex = /<div style="display:flex; gap:1rem;">\s*<a href="https:\/\/wa\.me.*?<\/div>/;
  
  if (regex.test(content)) {
    content = content.replace(regex, newBlock);
    fs.writeFileSync(filePath, content);
    console.log(`Updated socials in ${file}`);
    updatedCount++;
  } else {
      // Try exact string replacement if regex fails
      if(content.includes(oldBlock)) {
          content = content.replace(oldBlock, newBlock);
          fs.writeFileSync(filePath, content);
          console.log(`Updated socials in ${file} (exact match)`);
          updatedCount++;
      } else {
          console.log(`Could not find old block in ${file}`);
      }
  }
}

console.log(`Total files updated: ${updatedCount}`);
