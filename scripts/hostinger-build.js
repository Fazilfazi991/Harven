const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.error("Standalone directory not found! Ensure output: 'standalone' is in next.config.ts.");
  process.exit(1);
}

// 1. Copy public directory to standalone/public
const publicSrc = path.join(__dirname, '..', 'public');
const publicDest = path.join(standaloneDir, 'public');
if (fs.existsSync(publicSrc)) {
  console.log("Copying public directory...");
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}

// 2. Copy .next/static directory to standalone/.next/static
const staticSrc = path.join(__dirname, '..', '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
if (fs.existsSync(staticSrc)) {
  console.log("Copying static directory...");
  fs.cpSync(staticSrc, staticDest, { recursive: true });
}

console.log("Hostinger standalone preparation complete!");
