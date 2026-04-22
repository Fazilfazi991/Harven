const path = require('path');
const fs = require('fs');

// 1. Force Production Environment
process.env.NODE_ENV = 'production';

// 2. Define path to the standalone directory
const standaloneDir = path.join(__dirname, '.next', 'standalone');

if (fs.existsSync(standaloneDir)) {
  console.log('Starting Next.js Standalone server for Hostinger...');
  
  // 3. Change working directory to standalone so it uses the optimized node_modules and .next folder
  process.chdir(standaloneDir);
  
  // 4. Require the generated standalone server
  require(path.join(standaloneDir, 'server.js'));
} else {
  // Fallback in case standalone build failed or was not generated
  console.error("Standalone directory not found! Falling back to standard Next.js start.");
  const { execSync } = require('child_process');
  execSync('npx next start', { stdio: 'inherit' });
}