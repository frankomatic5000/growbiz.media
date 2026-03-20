import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const safariPath = join(root, 'public/safari-pinned-tab.svg');

// Simple SVG with GrowBiz stylized "G" shape
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path fill="black" d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm0 10c19.3 0 35 15.7 35 35 0 7.8-2.6 15-7 20.8l-13-13V45h15V35H50v12.9l10 10V65H35v-10h-5v15h35v-5.1l7.8 7.8C67.3 78.9 59.1 80 50 80c-16.6 0-30-13.4-30-30s13.4-30 30-30c8.3 0 15.8 3.4 21.2 8.8l7.1-7.1C70.8 14.9 60.9 10 50 10V5c-24.9 0-45 20.1-45 45s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5z"/>
</svg>`;

writeFileSync(safariPath, svgContent.trim());
console.log('Created safari-pinned-tab.svg for Safari pinned tab');
