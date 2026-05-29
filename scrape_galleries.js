const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const tasks = [
  {
    url: "https://collection.cloudinary.com/dght1xhvu/aae6e3d4984950af1dc312b1e539f2ef",
    file: "pooja-rooms.html",
    title: "Custom Pooja Room Projects",
    subtitle: "A showcase of custom carved marble interiors and pooja room designs we have completed."
  }
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  for (const task of tasks) {
    console.log(`Scraping ${task.url}...`);
    await page.goto(task.url, { waitUntil: 'networkidle2' });
    
    // Cloudinary collections load lazily
    await new Promise(r => setTimeout(r, 3000));
    
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
    
    await new Promise(r => setTimeout(r, 2000));

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

    console.log(`Found ${images.length} images for ${task.file}.`);
    
    // Inject into the HTML file
    const filePath = path.join('c:\\Gabbarwali', task.file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let galleryHtml = `
  <!-- DYNAMIC GALLERY -->
  <section class="section texture-light" id="gallery">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: 3rem;">
        <span class="section-label" style="display:inline-block">Our Portfolio</span>
        <h2 class="section-title">${task.title}</h2>
        <p class="subtext mx-auto">${task.subtitle}</p>
      </div>
      <div class="masonry-grid">
`;

    images.forEach((imgUrl, i) => {
      const highResUrl = imgUrl.replace(new RegExp('/c_fill,.*?/v', 'g'), '/q_auto,f_auto/v');
      galleryHtml += `        <div class="masonry-item reveal" style="transition-delay: 0.${(i % 5)}s;">
          <img src="${highResUrl}" alt="${task.title} Image ${i+1}" loading="lazy">
        </div>\n`;
    });

    galleryHtml += `      </div>
    </div>
  </section>
`;

    if (!content.includes('<!-- DYNAMIC GALLERY -->')) {
      content = content.replace('<!-- GLOBAL INQUIRY FORM -->', galleryHtml + '\n  <!-- GLOBAL INQUIRY FORM -->');
      fs.writeFileSync(filePath, content);
      console.log(`Successfully injected gallery into ${task.file}`);
    } else {
      console.log(`Gallery already exists in ${task.file}!`);
    }
  }

  await browser.close();
})();
