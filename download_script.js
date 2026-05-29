const fs = require('fs');
const https = require('https');
const path = require('path');

const poojaUrls = [
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969758/092d0d06-3f6e-4b70-bce9-39d2454b6f11_cfqg8u.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969750/1033dcea-e4f7-437b-bad5-7273f78bc8f7_wf9uej.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969753/10c450e0-82e3-491c-9f83-3afde28ae346_exhmkj.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969751/26b5b40d-d814-4219-b0ec-a235d74b2064_wsdecl.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969750/35f4531d-96b2-4f89-90dc-d3d630dddd6e_akocjm.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969750/3b8cb3b1-39d0-4991-9a9b-4d8a3bb02530_fgvgtm.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969754/69a815f5-2eae-40f7-8daa-7e7b370993ae_vpojop.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969756/814df38a-561d-476e-abae-4895e9fd8150_wn1uzm.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969759/832cb7a2-0c47-44e4-b503-47c99d4a5bed_fho7ba.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969755/866b1517-7678-48d8-9a63-afcaf7e6b272_zoq58k.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969758/884ef0ef-a7b2-4642-bd89-1fad443c0ef7_di22eh.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969760/894bc046-b085-451d-a278-fe982258dfa1_h4uzw4.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969756/955da06e-3167-4a9b-bda6-b9316adfb9e5_seec9s.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969750/95d1f0f0-24df-4e2f-9527-af27daa16984_dgz0mg.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969750/ad8587ef-00b3-496d-ba20-beb2f456e210_h5jtph.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969756/b4949210-3bcf-41fe-907b-063be9a2891f_g91m8v.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969757/d3226e2e-e7ff-4d5d-94b6-f54d55f60761_h9rxhl.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969753/e4deac5e-4a15-4237-a95a-28037851f0a7_lp28nh.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969753/efaa3eca-8267-43a7-92b4-f1a1305bec55_dmeoyb.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969759/f2c07e70-e3d3-4b7f-b34a-dab459172366_vkpb4a.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779969752/fe4e17c1-b355-4999-9fb2-80a37e2f7548_tgsjik.jpg"
];

const communalUrls = [
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779971176/5de933df-392c-414e-95a7-704a1c0008fb_bpsujv.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779971175/63158e10-1905-481f-9f14-6a79ed386352_nfmz4h.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779971176/63eeabd4-045d-426e-b70a-42818d8c59f6_itj2ny.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779971175/835c36e9-0b34-4daf-a4a5-397a093ebf80_ehrw2s.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779971175/a1a8d961-066a-4aff-890c-5080f4fa5052_zmvpa9.jpg",
  "https://res.cloudinary.com/dght1xhvu/image/upload/f_auto,q_auto,w_1000/v1779971175/c12e8a79-3dd8-4ed1-a30d-58edfa5de62b_byaq0q.jpg"
];

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

const imagesDir = 'c:\\Gabbarwali\\images';
const files = fs.readdirSync(imagesDir);

let poojaIdx = 0;
let communalIdx = 0;

(async () => {
  for (const file of files) {
    if (!file.endsWith('.webp')) continue;

    // Identify if it's communal
    let url;
    if (file.includes('communal') || file.includes('featured')) {
      url = communalUrls[communalIdx % communalUrls.length];
      communalIdx++;
    } else {
      url = poojaUrls[poojaIdx % poojaUrls.length];
      poojaIdx++;
    }

    try {
      await downloadImage(url, path.join(imagesDir, file));
      console.log(`Overwrote ${file}`);
    } catch (err) {
      console.error(`Failed to download ${url} for ${file}`, err);
    }
  }
  console.log("All done!");
})();
