const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const waBtnHtml = `
  <!-- Floating WhatsApp -->
  <a href="https://wa.me/919998914607?text=Hello%2C+I+want+a+free+consultation+for+marble+temple" class="whatsapp-fab" target="_blank" aria-label="Chat on WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>
`;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if whatsapp-fab already exists
  if (!content.includes('whatsapp-fab')) {
    // Insert right after <body> tag
    content = content.replace('<body>', '<body>\n' + waBtnHtml);
    fs.writeFileSync(filePath, content);
    console.log(`Injected WhatsApp button into ${file}`);
  }
}

// Update style.css
const stylePath = path.join(rootDir, 'css', 'style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');
const waCss = `
/* ==========================================================================
   FLOATING WHATSAPP BUTTON
   ========================================================================== */
.whatsapp-fab {
  position: fixed;
  bottom: 20px;
  left: 20px; /* Kept on the left side to avoid conflicting with scroll-to-top */
  width: 60px;
  height: 60px;
  background-color: #25d366;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  box-shadow: 2px 2px 15px rgba(0,0,0,0.2);
  z-index: 9999;
  text-decoration: none;
  transition: transform 0.3s ease;
}
.whatsapp-fab:hover {
  transform: scale(1.1);
  color: white;
}
`;

if (!styleContent.includes('.whatsapp-fab')) {
  styleContent += '\n' + waCss;
  fs.writeFileSync(stylePath, styleContent);
  console.log('Added WhatsApp CSS to style.css');
}
