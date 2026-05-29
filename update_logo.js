const fs = require('fs');
const https = require('https');
const path = require('path');

const logoUrl = "https://res.cloudinary.com/dght1xhvu/image/upload/q_auto/f_auto/v1780033401/c1e9e82d-02f9-42f2-b8b7-72c47c216c39_h0lumf.png";
const imagesDir = 'c:\\Gabbarwali\\images';
const logoDest = path.join(imagesDir, 'logo.png');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

(async () => {
  try {
    await downloadImage(logoUrl, logoDest);
    console.log("Downloaded logo.png successfully.");
    
    const rootDir = 'c:\\Gabbarwali';
    const files = fs.readdirSync(rootDir);
    
    for (const file of files) {
      if (file.endsWith('.html')) {
        const filePath = path.join(rootDir, file);
        let html = fs.readFileSync(filePath, 'utf8');
        html = html.replace(/src="images\/logo\.svg"/g, 'src="images/logo.png"');
        fs.writeFileSync(filePath, html);
        console.log(`Updated logo in ${file}`);
      }
    }
    
    console.log("All files updated!");
  } catch (e) {
    console.error("Error:", e);
  }
})();
