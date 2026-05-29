const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const url = "https://collection.cloudinary.com/dght1xhvu/99af9690bc510696bbaa4d04f223cb89";

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Cloudinary collections load lazily, wait for images
  await page.waitForTimeout(3000);
  
  // Scroll down to load all images
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  await page.waitForTimeout(2000);

  const images = await page.evaluate(() => {
    const imgs = document.querySelectorAll('img');
    const urls = [];
    imgs.forEach(img => {
      if (img.src && img.src.includes('res.cloudinary.com') && !img.src.includes('avatar')) {
        urls.push(img.src);
      }
    });
    return [...new Set(urls)];
  });

  console.log(`Found ${images.length} images.`);
  
  // Inject into home-mandirs.html
  const filePath = path.join('c:\\Gabbarwali', 'home-mandirs.html');
  let content = fs.readFileSync(filePath, 'utf8');
  
  let galleryHtml = `
  <!-- MANDIR GALLERY -->
  <section class="section texture-light" id="gallery">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: 3rem;">
        <span class="section-label" style="display:inline-block">Our Portfolio</span>
        <h2 class="section-title">Home Mandir Designs</h2>
        <p class="subtext mx-auto">Explore some of the beautiful custom marble mandirs we have crafted for homes across Gujarat.</p>
      </div>
      <div class="masonry-grid">
`;

  images.forEach((imgUrl, i) => {
    const highResUrl = imgUrl.replace(/\/c_fill,.*?\/v/, '/q_auto,f_auto/v');
    galleryHtml += `        <div class="masonry-item reveal" style="transition-delay: 0.${(i % 5)}s;">
          <img src="${highResUrl}" alt="Gabbarwali Home Mandir ${i+1}" loading="lazy">
        </div>\n`;
  });

  galleryHtml += `      </div>
    </div>
  </section>
`;

  // Insert before FAQ section
  if (!content.includes('<!-- MANDIR GALLERY -->')) {
    content = content.replace('<!-- FAQ -->', galleryHtml + '\n  <!-- FAQ -->');
    fs.writeFileSync(filePath, content);
    console.log("Successfully injected gallery into home-mandirs.html");
  } else {
    console.log("Gallery already exists!");
  }

  await browser.close();
})();
