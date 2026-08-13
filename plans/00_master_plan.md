# Master Implementation Plan — COOLIFT

*Mobile-first personal workout tracker | Tagline: "Lift. Track. Evolve."*

---

## 📌 Executive Summary

This master plan outlines the step-by-step architectural breakdown for developing **COOLIFT**, a mobile-first, local-first workout tracker built according to the **COOLIFT UI / UX & Design System**. The app features a dark fitness-tech aesthetic, zero-latency offline performance via Dexie (IndexedDB), an automated rest timer, and seamless cloud synchronization with MongoDB Atlas.

---

## 🎨 Visual Identity & Brand Assets

* **Brand Name:** COOLIFT
* **Tagline:** *Lift. Track. Evolve.*
* **Primary Logo:** `01_logo_primary.png` (Full logo with wordmark)
* **App Icon:** `02_logo_icon.png` (Stylized C + dumbbell symbol)
* **Default Theme:** **Midnight** (`#070B14` App background, `#0F1726` Surface, `#151F32` Elevated, `#2688FF` Primary Accent, `#06B6D4` Secondary Accent, `#10B981` Success).
* **Supported Themes:** Midnight (Default), Aurora, Forest, Sunset.
* **Typography:** Inter sans-serif with extra large, high-contrast workout numbers (20-32px).
* **Mobile UX Rule:** Minimum 44px touch targets, bottom-heavy thumb-friendly actions, and no dense desktop tables.

---

## 🗂️ Phase Roadmap Overview

| Phase File | Phase Title | Focus Area | Key Deliverables |
| :--- | :--- | :--- | :--- |
| [01_phase1_mvp_frontend_ui.md](file:///d:/projects/gym/plans/01_phase1_mvp_frontend_ui.md) | **Phase 1 — MVP UI & Navigation** | Mobile Frontend & Design System | COOLIFT Mobile Shell, Tailwind Midnight theme tokens, Primary/Icon logos, BottomNav, HomeView, 6-day WorkoutView, SetRow set logging |
| [02_phase2_local_first_indexeddb_timer.md](file:///d:/projects/gym/plans/02_phase2_local_first_indexeddb_timer.md) | **Phase 2 — IndexedDB & Rest Timer** | Client Storage & State | Dexie IndexedDB schemas (`GymTrackerDB`), persistent session store, RestTimer overlay with +30s/Skip |
| [03_phase3_backend_auth_mongodb.md](file:///d:/projects/gym/plans/03_phase3_backend_auth_mongodb.md) | **Phase 3 — Backend API & Auth** | Node/Express Backend | TypeScript REST API, JWT Authentication, Mongoose schemas (`User`, `Exercise`, `WorkoutPlan`, `WorkoutSession`, `BodyWeightEntry`) |
| [04_phase4_sync_engine.md](file:///d:/projects/gym/plans/04_phase4_sync_engine.md) | **Phase 4 — Offline Sync Engine** | Sync Layer | Sync queue in Dexie, idempotent `POST /api/sync` handler, online/offline status listeners, SyncBadge UI |
| [05_phase5_pwa_offline_shell.md](file:///d:/projects/gym/plans/05_phase5_pwa_offline_shell.md) | **Phase 5 — PWA & Offline Caching** | PWA Capabilities | Web App Manifest with COOLIFT app icon, Workbox service worker caching, offline shell |
| [06_phase6_progress_analytics.md](file:///d:/projects/gym/plans/06_phase6_progress_analytics.md) | **Phase 6 — Progress & PR Analytics** | Analytics & Visuals | Body Weight Tracker, 1RM Epley formula charts, volume metrics, personal record (PR) badges |
| [07_phase7_enhancements_deployment.md](file:///d:/projects/gym/plans/07_phase7_enhancements_deployment.md) | **Phase 7 — Overload Engine & Deployment** | Enhancements & Infra | Progressive overload suggestion engine, exercise notes, Vercel/Amplify frontend & EC2/Nginx backend deployment |

---

## 📂 Component Directory Architecture (`frontend/src/`)

```text
src/
├── app/                  # App shell & router provider
├── components/
│   ├── common/           # PrimaryButton, BottomSheet, StatCard, EmptyState
│   ├── workout/          # WorkoutCard, ExerciseCard, SetRow, RestTimer
│   ├── progress/         # ProgressChart, ExerciseHistory
│   └── navigation/       # BottomNavigation, Header (with COOLIFT logo)
├── features/
│   ├── workouts/         # Active workout view & plan manager
│   ├── exercises/        # Exercise library & details
│   ├── history/          # Completed workout list & date detail modal
│   ├── progress/         # Weight tracker & strength analytics
│   └── settings/         # Theme picker (Midnight/Aurora/Forest/Sunset) & sync control
├── store/                # Zustand stores (useWorkoutStore, useThemeStore)
├── db/                   # Dexie database definitions (GymTrackerDB)
├── services/             # API client & Sync Engine
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (1RM calculator, date formatters)
└── styles/               # CSS tokens & Tailwind theme config
```

---

## 🎯 Implementation Rules

1. **Mobile-First Priority:** Optimized for 360px–430px mobile viewports.
2. **Strict Design System Fidelity:** Use Midnight theme tokens (`#070B14`, `#0F1726`, `#151F32`, `#2688FF`, `#10B981`) and COOLIFT logos.
3. **Core UX Loop:** `Open → Today's Workout → Log Set → Rest → Next Set → Complete → Sync`.
