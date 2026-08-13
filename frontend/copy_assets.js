import fs from 'fs';
import path from 'path';

const srcDir = 'd:/projects/gym/COOLIFT_Design_Assets';
const destDir = 'd:/projects/gym/frontend/public/COOLIFT_Design_Assets';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach((file) => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} -> ${destPath}`);
  }
});
