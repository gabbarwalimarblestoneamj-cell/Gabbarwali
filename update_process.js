const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Gabbarwali\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  {
    old: '<img src="images/consultation-client-meeting.webp" alt="Client Consultation" class="step-img-note" loading="lazy">',
    new: '<div class="step-graphic" style="display: flex; justify-content: center; align-items: center; background: var(--color-white); border: 1px solid var(--color-border); padding: 2rem; border-radius: 8px; margin-top: 1.5rem; height: 120px; box-shadow: 0 5px 15px rgba(0,0,0,0.02);"><i class="fas fa-comments" style="font-size: 3rem; color: var(--color-primary);"></i></div>'
  },
  {
    old: '<img src="images/autocad-temple-design-drawing.webp" alt="AutoCAD Design" class="step-img-note" loading="lazy">',
    new: '<div class="step-graphic" style="display: flex; justify-content: center; align-items: center; background: var(--color-white); border: 1px solid var(--color-border); padding: 2rem; border-radius: 8px; margin-top: 1.5rem; height: 120px; box-shadow: 0 5px 15px rgba(0,0,0,0.02);"><i class="fas fa-pen-ruler" style="font-size: 3rem; color: var(--color-primary);"></i></div>'
  },
  {
    old: '<img src="images/design-approval-client.webp" alt="Design Approval" class="step-img-note" loading="lazy">',
    new: '<div class="step-graphic" style="display: flex; justify-content: center; align-items: center; background: var(--color-white); border: 1px solid var(--color-border); padding: 2rem; border-radius: 8px; margin-top: 1.5rem; height: 120px; box-shadow: 0 5px 15px rgba(0,0,0,0.02);"><i class="fas fa-check-circle" style="font-size: 3rem; color: var(--color-primary);"></i></div>'
  },
  {
    old: '<img src="images/marble-carving-craftsman-ambaji.webp" alt="Marble Carving" class="step-img-note" loading="lazy">',
    new: '<div class="step-graphic" style="display: flex; justify-content: center; align-items: center; background: var(--color-white); border: 1px solid var(--color-border); padding: 2rem; border-radius: 8px; margin-top: 1.5rem; height: 120px; box-shadow: 0 5px 15px rgba(0,0,0,0.02);"><i class="fas fa-truck" style="font-size: 3rem; color: var(--color-primary);"></i></div>'
  }
];

for (const rep of replacements) {
  content = content.replace(rep.old, rep.new);
}

fs.writeFileSync(filePath, content);
console.log("Updated index.html process section");
