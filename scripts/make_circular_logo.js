const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const artifactPath = 'C:/Users/user/.gemini/antigravity/brain/10583221-31c4-4aae-be97-ebf3217c3d15/yamini_lyrics_sacred_emblem_1795364220926.jpg';
  const fileBuffer = fs.readFileSync(artifactPath);
  
  const width = 1024;
  const height = 1024;
  const cx = 512;
  const cy = 512;
  // Exact radius of the golden carved medallion (starts at r = 395)
  const radius = 394;

  // Build exact alpha mask buffer
  const alphaChannel = Buffer.alloc(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      let alpha = 0;
      if (dist <= radius) {
        alpha = 255;
      } else if (dist <= radius + 2) {
        alpha = Math.round(255 * (radius + 2 - dist) / 2);
      }
      alphaChannel[y * width + x] = alpha;
    }
  }

  // Create 1024x1024 1-channel alpha image
  const alphaMask = await sharp(alphaChannel, {
    raw: { width, height, channels: 1 }
  }).png().toBuffer();

  // Crop bounding box
  const cropSize = (radius + 2) * 2; // ~792px
  const cropLeft = cx - radius - 2;
  const cropTop = cy - radius - 2;

  // Mask the image and extract the bounding box
  const croppedMedallion = await sharp(fileBuffer)
    .composite([{
      input: alphaMask,
      blend: 'dest-in'
    }])
    .extract({
      left: cropLeft,
      top: cropTop,
      width: cropSize,
      height: cropSize
    })
    .png()
    .toBuffer();

  const outputPath = path.join(__dirname, '../public/assets/logo.png');
  fs.writeFileSync(outputPath, croppedMedallion);
  fs.writeFileSync(path.join(__dirname, '../public/assets/logo_circular.png'), croppedMedallion);

  // Sync to desktop Yamini_Lyrics
  const desktopYaminiLogo = 'C:/Users/user/OneDrive/Desktop/Yamini_Lyrics/public/assets/logo.png';
  try {
    fs.writeFileSync(desktopYaminiLogo, croppedMedallion);
    console.log('Updated Yamini_Lyrics desktop logo');
  } catch (err) {
    console.log('Desktop Yamini_Lyrics sync error:', err.message);
  }

  const resultMeta = await sharp(croppedMedallion).metadata();
  console.log('SUCCESS: Pure borderless circular medallion created:', {
    format: resultMeta.format,
    hasAlpha: resultMeta.hasAlpha,
    width: resultMeta.width,
    height: resultMeta.height
  });
}

processLogo().catch(console.error);