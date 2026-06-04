const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const templatePath = path.join(rootDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const locations = [
  'ahmedabad',
  'surat',
  'vadodara',
  'rajkot',
  'banaskantha',
  'gujarat'
];

locations.forEach(loc => {
  const City = loc.charAt(0).toUpperCase() + loc.slice(1);
  const isGujarat = loc === 'gujarat';
  const LocName = isGujarat ? 'Gujarat' : `${City}, Gujarat`;

  let newHtml = templateHtml;

  // Replace Title
  newHtml = newHtml.replace(
    /<title>.*?<\/title>/, 
    `<title>Marble Temple Manufacturer in ${City} | Custom Mandirs & Pooja Rooms</title>`
  );

  // Replace Description
  newHtml = newHtml.replace(
    /<meta name="description"\s+content="[^"]*">/, 
    `<meta name="description" content="Top marble temple manufacturer serving ${LocName}. We build custom marble home mandirs, pooja rooms, and communal temples with premium Ambaji marble.">`
  );

  // Replace og:title
  newHtml = newHtml.replace(
    /<meta property="og:title" content="[^"]*">/, 
    `<meta property="og:title" content="Marble Temple Manufacturer in ${City} | Custom Mandirs & Pooja Rooms">`
  );

  // Replace og:description
  newHtml = newHtml.replace(
    /<meta property="og:description"\s+content="[^"]*">/, 
    `<meta property="og:description" content="Top marble temple manufacturer serving ${LocName}. We build custom marble home mandirs, pooja rooms, and communal temples with premium Ambaji marble.">`
  );

  // Replace H1
  newHtml = newHtml.replace(
    /Premium Marble Temple Manufacturer in Ambaji, Gujarat/, 
    `Premium Marble Temple Manufacturer for ${LocName}`
  );

  // Update canonical
  newHtml = newHtml.replace(
    /<link rel="canonical" href="https:\/\/gabbarwalimarblestone.com\/index.html">/,
    `<link rel="canonical" href="https://gabbarwalimarblestone.com/marble-temple-${loc}.html">`
  );

  // Inject Map in Section 10
  const mapIframe = `
      <div style="margin: 2rem auto; max-width: 800px; padding: 1rem; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h3>Our Service Reach in ${City}</h3>
        <p style="margin-bottom: 1rem;">We deliver and install premium Ambaji marble temples directly to ${City}.</p>
        <iframe src="https://maps.google.com/maps?q=${City},%20Gujarat&t=&z=11&ie=UTF8&iwloc=&output=embed" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
  `;
  newHtml = newHtml.replace(
    /<div class="map-container">/,
    `${mapIframe}\n      <div class="map-container">`
  );

  const outPath = path.join(rootDir, `marble-temple-${loc}.html`);
  fs.writeFileSync(outPath, newHtml, 'utf8');
  console.log(`Created ${outPath}`);
});
