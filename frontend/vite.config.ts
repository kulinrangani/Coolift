import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Auto-sync design asset PNGs to public folder for PWA icons
const srcDir = 'd:/projects/gym/COOLIFT_Design_Assets';
const destDir = path.resolve(__dirname, 'public/COOLIFT_Design_Assets');
const iconsDir = path.resolve(__dirname, 'public/icons');

[destDir, iconsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

if (fs.existsSync(srcDir)) {
  fs.readdirSync(srcDir).forEach((file) => {
    const srcPath = path.join(srcDir, file);
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, path.join(destDir, file));
      if (file === '02_logo_icon.png') {
        fs.copyFileSync(srcPath, path.join(iconsDir, 'icon-192.png'));
        fs.copyFileSync(srcPath, path.join(iconsDir, 'icon-512.png'));
        fs.copyFileSync(srcPath, path.join(iconsDir, 'icon-maskable.png'));
        fs.copyFileSync(srcPath, path.resolve(__dirname, 'public/apple-touch-icon.png'));
        fs.copyFileSync(srcPath, path.resolve(__dirname, 'public/favicon.png'));
      }
    }
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
