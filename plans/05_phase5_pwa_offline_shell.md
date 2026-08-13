# Phase 5 Plan — PWA & Offline Application Shell

*Focus: Service Worker caching, Web App Manifest, offline application availability, and native-like app installation.*

---

## 🎯 Phase Goal
Turn the web app into a fully functional Progressive Web App (PWA) that can be installed on iOS and Android home screens, loads instantaneously offline, and functions smoothly as a standalone app.

---

## 📋 Task Breakdown

### 1. Vite PWA Configuration (`vite.config.ts`)
Integrate `vite-plugin-pwa` with Workbox caching strategies:
```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Workout Tracker — Coolift',
    short_name: 'Workout',
    description: 'Fast, mobile-first, local-first workout tracker',
    theme_color: '#0f172a',
    background_color: '#0f172a',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
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

### 2. Assets & App Icons Generation
* Create high-resolution app icons (192x192, 512x512, apple-touch-icon) with dark theme branding.
* Add SVG vector logo for splash screens.

### 3. PWA Installation Prompt Component (`PWAInstallBanner.tsx`)
* Listen for browser `beforeinstallprompt` event.
* Display custom bottom banner: `"Install Workout Tracker for fast gym access"`.
* Provide step-by-step instructions for iOS Safari users (`Share -> Add to Home Screen`).

### 4. Service Worker Update Notification
* Show subtle notification banner when a new app build version is deployed: `"New version available. [Tap to update]"`.

---

## 🧪 Acceptance Criteria
1. App is detectable as an installable PWA by Chrome / Safari.
2. Opening the app in Airplane mode loads the full UI without white screen / network error.
3. Installed PWA launches in standalone mode without browser URL bar.
4. Assets are cached by Workbox service worker.
