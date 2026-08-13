# Phase 5 Plan — COOLIFT PWA & Offline Application Shell

*Focus: Service Worker caching, Web App Manifest with COOLIFT brand assets, offline application availability, and native-like app installation.*

---

## 🎯 Phase Goal
Turn **COOLIFT** into a fully functional Progressive Web App (PWA) that can be installed on iOS and Android home screens using the `02_logo_icon.png` app icon, loads instantaneously offline, and functions smoothly as a standalone app.

---

## 📋 Task Breakdown

### 1. Vite PWA Configuration (`vite.config.ts`)
Integrate `vite-plugin-pwa` with Workbox caching strategies and COOLIFT branding:
```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'COOLIFT_Design_Assets/*'],
  manifest: {
    name: 'COOLIFT — Mobile Fitness Tracker',
    short_name: 'COOLIFT',
    description: 'Lift. Track. Evolve. Mobile-first, local-first workout tracker',
    theme_color: '#070B14',
    background_color: '#070B14',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      { src: '/COOLIFT_Design_Assets/02_logo_icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/COOLIFT_Design_Assets/02_logo_icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/COOLIFT_Design_Assets/02_logo_icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: { cacheName: 'google-fonts-stylesheets' }
      }
    ]
  }
})
```

### 2. Assets & App Icons Integration
* Copy `02_logo_icon.png` and `01_logo_primary.png` to frontend public directory (`frontend/public/assets/`).
* Configure apple-touch-icon and splash screens for iOS.

### 3. PWA Installation Prompt Component (`PWAInstallBanner.tsx`)
* Listen for browser `beforeinstallprompt` event.
* Display custom bottom banner: `"Install COOLIFT for instant gym access"`.
* Provide step-by-step instructions for iOS Safari users (`Share -> Add to Home Screen`).

### 4. Service Worker Update Notification
* Show subtle notification banner when a new app build version is deployed: `"New version available. [Tap to update]"`.

---

## 🧪 Acceptance Criteria
1. App is detectable as an installable PWA by Chrome / Safari with COOLIFT logo icon (`02_logo_icon.png`).
2. Opening the app in Airplane mode loads the full UI without white screen / network error.
3. Installed PWA launches in standalone mode with Midnight background (`#070B14`) without browser URL bar.
4. Assets are cached by Workbox service worker.
