const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Gabbarwali';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'contact.html');

const inquiryFormHtml = `
  <!-- GLOBAL INQUIRY FORM -->
  <section class="section texture-light" style="border-top: 1px solid var(--color-border); padding: 4rem 0;">
    <div class="container reveal">
      <div class="text-center" style="margin-bottom: 2rem;">
        <h2 class="section-title" style="font-size: 2rem;">Request a Free Quote</h2>
        <p class="subtext">Fill out this quick form and we will reply instantly via WhatsApp.</p>
      </div>
      <form class="whatsapp-form" style="max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; background: var(--color-white); padding: 2.5rem; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border-radius: 8px;">
        <input type="text" name="name" placeholder="Your Name *" required style="padding: 1rem; border: 1px solid var(--color-border); font-family: var(--font-body); font-size: 1rem; outline: none;">
        <input type="tel" name="phone" placeholder="Phone Number *" required style="padding: 1rem; border: 1px solid var(--color-border); font-family: var(--font-body); font-size: 1rem; outline: none;">
        <select name="service" style="padding: 1rem; border: 1px solid var(--color-border); font-family: var(--font-body); font-size: 1rem; outline: none; background: transparent;">
          <option value="Home Mandir">Home Mandir</option>
          <option value="Communal Temple">Communal Temple</option>
          <option value="Outdoor Shrine">Outdoor Shrine</option>
          <option value="Pooja Room">Custom Pooja Room</option>
          <option value="Other">Other Query</option>
        </select>
        <textarea name="message" placeholder="Message (Optional)" rows="3" style="padding: 1rem; border: 1px solid var(--color-border); font-family: var(--font-body); font-size: 1rem; outline: none; resize: vertical;"></textarea>
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
          <i class="fab fa-whatsapp" style="font-size: 1.25rem;"></i> Send to WhatsApp
        </button>
      </form>
    </div>
  </section>
`;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('GLOBAL INQUIRY FORM')) {
    content = content.replace('<!-- FOOTER -->', inquiryFormHtml + '\n  <!-- FOOTER -->');
    fs.writeFileSync(filePath, content);
    console.log(`Added inquiry form to ${file}`);
  }
}

// Now handle contact.html manually
const contactPath = path.join(rootDir, 'contact.html');
let contactContent = fs.readFileSync(contactPath, 'utf8');
contactContent = contactContent.replace('<form action="https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT" method="POST"', '<form class="whatsapp-form"');
fs.writeFileSync(contactPath, contactContent);
console.log("Updated contact.html form");

// Update main.js
const mainJsPath = path.join(rootDir, 'js', 'main.js');
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
if (!mainJsContent.includes('WhatsApp Form Logic')) {
  const jsToAdd = `
  // WhatsApp Form Logic
  const waForms = document.querySelectorAll('.whatsapp-form');
  waForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('[name="name"]') ? this.querySelector('[name="name"]').value : '';
      const phone = this.querySelector('[name="phone"]') ? this.querySelector('[name="phone"]').value : '';
      const service = this.querySelector('[name="service"]') ? this.querySelector('[name="service"]').value : 'General Inquiry';
      const message = this.querySelector('[name="message"]') ? this.querySelector('[name="message"]').value : '';
      
      const text = \`Hello Gabbarwali Marble Stone,\\n\\nI have an inquiry:\\n*Name:* \${name}\\n*Phone:* \${phone}\\n*Interested In:* \${service}\\n*Message:* \${message}\`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = \`https://wa.me/919998914607?text=\${encodedText}\`;
      
      window.open(whatsappUrl, '_blank');
    });
  });
`;
  // Add it before DOMContentLoaded closes
  mainJsContent = mainJsContent.replace('}); // End DOMContentLoaded', jsToAdd + '\n}); // End DOMContentLoaded');
  // If the replace failed because of different ending comment
  if (!mainJsContent.includes('WhatsApp Form Logic')) {
      const lastBracket = mainJsContent.lastIndexOf('});');
      mainJsContent = mainJsContent.substring(0, lastBracket) + jsToAdd + mainJsContent.substring(lastBracket);
  }
  fs.writeFileSync(mainJsPath, mainJsContent);
  console.log("Updated main.js with WhatsApp Logic");
}
