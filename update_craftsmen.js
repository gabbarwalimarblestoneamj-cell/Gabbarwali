const fs = require('fs');

const btsUrls = [
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032249/WhatsApp_Image_2026-05-22_at_3.42.28_PM_igsldb.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032252/WhatsApp_Image_2026-05-22_at_3.43.29_PM_1_hojp7s.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032252/WhatsApp_Image_2026-05-22_at_3.43.29_PM_jsqiye.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032253/WhatsApp_Image_2026-05-22_at_3.43.31_PM_eegfj9.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032254/WhatsApp_Image_2026-05-22_at_3.43.33_PM_1_rmhcc3.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032249/WhatsApp_Image_2026-05-22_at_3.43.33_PM_3_ufvfxx.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032254/WhatsApp_Image_2026-05-22_at_3.43.33_PM_c8xlqz.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032415/WhatsApp_Image_2026-05-22_at_3.43.34_PM_2_ehrqur.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032249/WhatsApp_Image_2026-05-22_at_3.43.34_PM_3_sxmzl5.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032249/WhatsApp_Image_2026-05-22_at_3.43.36_PM_1_oteb2c.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032248/WhatsApp_Image_2026-05-22_at_3.43.40_PM_1_b1bx6s.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032412/WhatsApp_Image_2026-05-22_at_3.43.40_PM_qvtzye.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032411/WhatsApp_Image_2026-05-22_at_3.43.41_PM_1_z5p15w.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032411/WhatsApp_Image_2026-05-22_at_3.43.41_PM_2_cw6kpf.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032248/WhatsApp_Image_2026-05-22_at_3.43.41_PM_3_q16i43.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032412/WhatsApp_Image_2026-05-22_at_3.43.41_PM_w2uci6.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032410/WhatsApp_Image_2026-05-22_at_3.43.42_PM_1_ystbvx.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032410/WhatsApp_Image_2026-05-22_at_3.43.42_PM_nr4ex4.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032409/WhatsApp_Image_2026-05-22_at_3.43.43_PM_brsrsv.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032409/WhatsApp_Image_2026-05-22_at_3.43.44_PM_1_nwgil1.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032413/WhatsApp_Image_2026-05-22_at_3.43.44_PM_kienrp.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032414/WhatsApp_Image_2026-05-22_at_3.43.45_PM_1_rjmlv2.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032409/WhatsApp_Image_2026-05-22_at_3.43.45_PM_2_tjoxak.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032414/WhatsApp_Image_2026-05-22_at_3.43.45_PM_lru5gs.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032415/WhatsApp_Image_2026-05-22_at_3.43.46_PM_1_skukzf.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032417/WhatsApp_Image_2026-05-22_at_3.43.49_PM_2_kyysee.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032248/WhatsApp_Image_2026-05-22_at_3.43.49_PM_k2qbzv.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032249/WhatsApp_Image_2026-05-22_at_3.43.51_PM_2_j3omjz.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032250/WhatsApp_Image_2026-05-22_at_3.43.52_PM_1_mhkmh5.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032250/WhatsApp_Image_2026-05-22_at_3.43.52_PM_2_kkwezn.jpg?_s=public-apps",
  "https://res.cloudinary.com/dght1xhvu/image/upload/h_250,fl_preserve_transparency/v1780032251/WhatsApp_Image_2026-05-22_at_3.43.52_PM_xlbt2c.jpg?_s=public-apps"
];

// Optimize URLs
const optimizedUrls = btsUrls.map(url => {
  return url.replace('h_250,fl_preserve_transparency', 'f_auto,q_auto,w_800').split('?')[0];
});

let html = fs.readFileSync('c:\\Gabbarwali\\the-craftsmen.html', 'utf8');

// Replace CSS
const oldCss = `.photojournalism-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: var(--spacing-lg);
    }
    .photo-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .photo-item.wide { grid-column: 1 / -1; }
    .photo-item.large { grid-column: span 2; }
    .photo-item img {
      width: 100%;
      height: 350px;
      object-fit: cover;
      filter: grayscale(10%) contrast(1.1);
    }
    .photo-item.wide img { height: 500px; }
    .photo-caption {
      font-family: var(--font-body);
      font-style: italic;
      color: var(--color-primary-dark);
      font-size: 0.875rem;
    }`;
    
const newCss = `.photojournalism-grid {
      column-count: 3;
      column-gap: 1.5rem;
      margin-top: var(--spacing-lg);
    }
    .photo-item {
      display: inline-block;
      width: 100%;
      margin-bottom: 1.5rem;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .photo-item:hover {
      transform: translateY(-5px);
    }
    .photo-item img {
      width: 100%;
      height: auto;
      display: block;
    }`;
    
html = html.replace(oldCss, newCss);

// Remove the old media queries related to the old grid layout
html = html.replace('.photojournalism-grid { grid-template-columns: 1fr; }', '.photojournalism-grid { column-count: 1; }');
html = html.replace('.photo-item.wide, .photo-item.large { grid-column: auto; }', '');
html = html.replace('.photo-item img, .photo-item.wide img { height: auto; min-height: 250px; }', '');
// Add tablet media query
html = html.replace('.owner-card { grid-template-columns: 1fr; }', '.photojournalism-grid { column-count: 2; }\n      .owner-card { grid-template-columns: 1fr; }');

// Replace Grid HTML
let gridHtml = '<div class="photojournalism-grid">\n';
optimizedUrls.forEach((url, index) => {
  const delay = (index % 3) * 0.1;
  gridHtml += `        <div class="photo-item reveal" style="transition-delay:${delay}s">\n          <img src="${url}" alt="Behind the scenes craftsmanship" loading="lazy">\n        </div>\n`;
});
gridHtml += '      </div>';

const startIndex = html.indexOf('<div class="photojournalism-grid">');
const endIndex = html.indexOf('</div>\n    </div>\n  </section>\n\n  <!-- MEET THE OWNER -->');

if (startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + gridHtml + html.substring(endIndex);
}

fs.writeFileSync('c:\\Gabbarwali\\the-craftsmen.html', html);
console.log("Updated the-craftsmen.html with 31 BTS photos.");
