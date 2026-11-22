const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const inputPath = path.join(__dirname, '../public/assets/logo.png');
  const fileBuffer = fs.readFileSync(inputPath);
  const metadata = await sharp(fileBuffer).metadata();
  const width = metadata.width || 1024;
  const height = metadata.height || 1024;
  
  // Radius for circular cutout - slightly inside to avoid any outer square edge artifacts
  const radius = Math.floor(Math.min(width, height) / 2) - 10;
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);

  // SVG mask with smooth antialiased circle
  const circleSvg = `
    <svg width="${width}" height="${height}">
      <defs>
        <radialGradient id="edgeFeather" cx="50%" cy="50%" r="50%">
          <stop offset="97%" stop-color="white" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#edgeFeather)" />
    </svg>
  `;

  // Apply circular mask with destination-in blend mode
  const circularBuffer = await sharp(fileBuffer)
    .composite([{
      input: Buffer.from(circleSvg),
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  // Save back as public/assets/logo.png
  fs.writeFileSync(inputPath, circularBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/assets/logo_circular.png'), circularBuffer);

  // Also update in Yamini_Lyrics on Desktop
  const desktopYaminiLogo = 'C:/Users/user/OneDrive/Desktop/Yamini_Lyrics/public/assets/logo.png';
  try {
    fs.writeFileSync(desktopYaminiLogo, circularBuffer);
    console.log('Updated Yamini_Lyrics desktop logo');
  } catch (err) {
    console.log('Desktop Yamini_Lyrics update skipped or failed:', err.message);
  }

  const resultMeta = await sharp(circularBuffer).metadata();
  console.log('Logo successfully converted to transparent circular PNG:', {
    format: resultMeta.format,
    hasAlpha: resultMeta.hasAlpha,
    width: resultMeta.width,
    height: resultMeta.height
  });
}

processLogo().catch(console.error);
