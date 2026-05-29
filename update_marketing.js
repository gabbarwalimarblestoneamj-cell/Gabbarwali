const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update Footer Tagline
  content = content.replace(/"Where Stone Meets the Sacred"/g, '"Premium Marble Temples & Custom Pooja Rooms"');

  // If index.html, apply specific changes
  if (file === 'index.html') {
    // 1. Hero Title
    content = content.replace('Where Stone<br>Meets the Sacred', 'Premium Marble Temples<br>& Custom Pooja Rooms');
    
    // 2. Adjust Hero font size to fit the longer text
    content = content.replace('<h1 class="hero-title reveal">', '<h1 class="hero-title reveal" style="font-size: clamp(2.5rem, 5vw, 4rem);">');

    // 3. Update Home Mandirs Image
    content = content.replace(
      '<img src="images/pooja-room-home-mandir-ambaji.webp" alt="Home Marble Mandir" class="service-card-img" loading="lazy">',
      '<img src="https://res.cloudinary.com/dght1xhvu/image/upload/q_auto/f_auto/v1780035512/23c12543-a62d-46b8-acbe-b861ecec7101_e4r2ca.png" alt="Home Marble Mandir" class="service-card-img" loading="lazy">'
    );

    // 4. Update Communal Temples Image
    content = content.replace(
      '<img src="images/communal-temple-gujarat-exterior.webp" alt="Communal Temple Gujarat" class="service-card-img" loading="lazy">',
      '<img src="https://res.cloudinary.com/dght1xhvu/image/upload/q_auto/f_auto/v1779971176/63eeabd4-045d-426e-b70a-42818d8c59f6_itj2ny.png" alt="Communal Temple Gujarat" class="service-card-img" loading="lazy">'
    );

    // 5. Update Outdoor Temples Title & Image
    content = content.replace(
      '<h3 class="service-title">Outdoor & Roadside Temples</h3>',
      '<h3 class="service-title">Outdoor Temples</h3>'
    );
    content = content.replace(
      '<img src="images/outdoor-marble-shrine-small.webp" alt="Outdoor Shrine Marble" class="service-card-img" loading="lazy">',
      '<img src="https://res.cloudinary.com/dght1xhvu/image/upload/q_auto/f_auto/v1779971176/5de933df-392c-414e-95a7-704a1c0008fb_bpsujv.png" alt="Outdoor Shrine Marble" class="service-card-img" loading="lazy">'
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
