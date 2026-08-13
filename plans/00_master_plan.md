# Master Implementation Plan — Workout Tracker

*A mobile-first, local-first personal workout tracking web application.*

---

## 📌 Executive Summary

This master plan outlines the step-by-step architectural breakdown for developing the Workout Tracker application. The project follows a **Local-First** architecture ensuring 100% offline functionality during gym sessions with seamless, idempotent cloud synchronization.

---

## 🗂️ Phase Roadmap Overview

| Phase File | Phase Title | Focus Area | Key Deliverables |
| :--- | :--- | :--- | :--- |
| [01_phase1_mvp_frontend_ui.md](file:///d:/projects/gym/plans/01_phase1_mvp_frontend_ui.md) | **Phase 1 — MVP UI & Navigation** | Mobile Frontend | Mobile shell, bottom navigation, Home view, 6-day Workout view, set logging & prefilled values |
| [02_phase2_local_first_indexeddb_timer.md](file:///d:/projects/gym/plans/02_phase2_local_first_indexeddb_timer.md) | **Phase 2 — IndexedDB & Rest Timer** | Client State & Storage | Dexie IndexedDB schemas, persistent session store, rest timer (+30s/Skip) |
| [03_phase3_backend_auth_mongodb.md](file:///d:/projects/gym/plans/03_phase3_backend_auth_mongodb.md) | **Phase 3 — Backend API & Auth** | Node/Express Backend | TypeScript REST API, JWT Authentication, Mongoose schemas (User, Exercise, WorkoutSession, Weight) |
| [04_phase4_sync_engine.md](file:///d:/projects/gym/plans/04_phase4_sync_engine.md) | **Phase 4 — Offline Sync Engine** | Offline Synchronization | Sync queue, operation batching, idempotent API handlers, network status listeners |
| [05_phase5_pwa_offline_shell.md](file:///d:/projects/gym/plans/05_phase5_pwa_offline_shell.md) | **Phase 5 — PWA & Offline Caching** | PWA Capabilities | Web app manifest, service worker caching (Workbox), PWA installation prompts |
| [06_phase6_progress_analytics.md](file:///d:/projects/gym/plans/06_phase6_progress_analytics.md) | **Phase 6 — Progress & PR Analytics** | Data Visualization | Weight tracking, 1RM progression charts, volume metrics, PR highlights |
| [07_phase7_enhancements_deployment.md](file:///d:/projects/gym/plans/07_phase7_enhancements_deployment.md) | **Phase 7 — Overload Engine & Deployment** | Enhancements & Infra | Progressive overload suggestions, exercise notes, Vercel/Amplify frontend & EC2/Nginx backend setup |

---

## 🏗️ Architecture Architecture Flow

```text
📱 PWA Client (Mobile First 360-430px)
 ├── 🎨 React 18 + Vite + Tailwind CSS
 ├── ⚡ Zustand (UI & Active Workout State)
 ├── 💾 Dexie / IndexedDB (Local Durable Storage)
 └── 🔄 Background Sync Layer
      │
      ▼ (HTTP / HTTPS REST API)
 ⚙️ Backend Server (Node.js + Express + TypeScript)
 ├── 🔒 JWT Auth & Zod Validation
 └── 🗄️ MongoDB Atlas Database
```

---

## 🎯 Implementation Strategy & Guidelines

1. **Local-First Priority:** Gym workouts must never fail or stall due to missing internet connection. All writes occur locally first.
2. **One-Handed Phone UX:** Touch targets must be at least 44x44px, numeric inputs should be easily editable, and table clutter must be minimized.
3. **No Overengineering:** Keep V1 slim, fast, and optimized for the core loop: `Open → Today's Workout → Log Set → Rest → Next Set → Complete → Sync`.
