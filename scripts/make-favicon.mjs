import sharp from 'sharp';
import ico from 'ico-endec';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const logoPath = join(root, 'public/assets/logo-dark.png');
const faviconPath = join(root, 'public/favicon.ico');

async function createFavicon() {
  const image = sharp(logoPath);
  
  // Create sizes needed for favicon
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  
  for (const size of sizes) {
    const buf = await image
      .resize(size, size, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png({ compressionLevel: 9 })
      .toBuffer();
    pngBuffers.push(buf);
  }
  
  // Encode to ICO format
  const icoBuffer = ico.encode(pngBuffers);
  writeFileSync(faviconPath, icoBuffer);
  
  console.log('Created favicon.ico with sizes:', sizes.join(', '), 'x', sizes.join('px, '), 'px');
}

createFavicon().catch(err => {
  console.error('Error creating favicon:', err);
  process.exit(1);
});
