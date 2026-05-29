const fs = require('fs');
const path = require('path');

// 1. Add Masonry & Lightbox CSS to style.css
const stylePath = 'c:\\Gabbarwali\\css\\style.css';
let styleContent = fs.readFileSync(stylePath, 'utf8');

const cssToAdd = `
/* ==========================================================================
   MASONRY GALLERY & LIGHTBOX
   ========================================================================== */
.masonry-grid {
  column-count: 3;
  column-gap: 2rem;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 2rem;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}
.masonry-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
.masonry-item img {
  width: 100%;
  display: block;
  border-radius: 8px;
}

.lightbox {
  display: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.lightbox.active {
  display: flex;
  opacity: 1;
}
.lightbox-img {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  border-radius: 4px;
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  z-index: 10000;
  line-height: 1;
}
`;

if (!styleContent.includes('.lightbox {')) {
  styleContent += '\n' + cssToAdd;
  fs.writeFileSync(stylePath, styleContent);
  console.log('Added gallery CSS to style.css');
}

// 2. Add Lightbox JS to main.js
const mainJsPath = 'c:\\Gabbarwali\\js\\main.js';
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

const jsToAdd = `
  // LIGHTBOX LOGIC
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = \`
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-img" src="" alt="Lightbox Image">
  \`;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.masonry-item img, .gallery-item img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      lightboxImg.src = e.target.src.replace('/q_auto,f_auto,w_500/', '/q_auto,f_auto/'); // fetch full res if needed
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });
`;

if (!mainJsContent.includes('LIGHTBOX LOGIC')) {
  // Insert before the last closing brace of DOMContentLoaded
  const insertPos = mainJsContent.lastIndexOf('});');
  if (insertPos !== -1) {
    mainJsContent = mainJsContent.slice(0, insertPos) + jsToAdd + '\n' + mainJsContent.slice(insertPos);
    fs.writeFileSync(mainJsPath, mainJsContent);
    console.log('Added Lightbox JS to main.js');
  }
}
