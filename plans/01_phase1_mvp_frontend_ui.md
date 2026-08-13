# Phase 1 Plan — MVP Frontend UI & Navigation

*Focus: Fast mobile-first layout, bottom navigation, Home Screen, Workout Screen set logging, and prefilled previous values.*

---

## 🎯 Phase Goal
Build a responsive, highly performant mobile web interface optimized for one-handed phone usage (360px–430px). The user should be able to launch the app, see today's workout, start a session, log sets, and see target/previous performance values.

---

## 📋 Task Breakdown

### 1. Project Infrastructure & Dependencies
* Verify and configure `frontend/` with Vite, React 18, TypeScript, Tailwind CSS, Lucide Icons, and Zustand.
* Define dark-mode color theme tailored for gym usage (high contrast, crisp typography).

### 2. Core Layout & Navigation
* Create `BottomNav.tsx` with 5 navigation items:
  * 🏠 **Home:** Today's workout & weekly status.
  * 🏋️ **Workout:** Active workout logging screen.
  * 📜 **History:** Past sessions log.
  * 📊 **Progress:** Body weight & volume metrics.
  * ⚙️ **Settings:** User preferences & account setup.
* Implement mobile layout wrapper with sticky bottom bar and safe area paddings.

### 3. Home Screen (`HomeView.tsx`)
* **Today's Workout Card:** Displays current plan day (e.g., *Day 1 — Chest + Triceps*), estimated duration (~45 min), and total exercise count (5 exercises).
* **CTA Button:** Large, high-visibility `START WORKOUT` button leading straight to `WorkoutView`.
* **Weekly Overview Bar:** 7-day visual pills showing completed vs. upcoming workout days.

### 4. Default Workout Plan Data (`mockPlanData.ts`)
Seed the initial 6-day workout split into frontend constants:
* **Day 1 (Chest + Triceps):** Bench Press, Incline DB Press, Machine Chest Press, Rope Pushdown, Overhead Cable Extension.
* **Day 2 (Back + Biceps):** Lat Pulldown, T-Bar Row, Bent-Over Row, Close-Grip Pulldown, Incline DB Curl, Cable Hammer Curl, EZ-Bar Curl.
* **Day 3 (Shoulders + Legs):** Leg Press, Hamstring Curl, Leg Extension, Calf Raise, Shoulder Press, Lateral Raise, Rear Delt Fly.
* **Day 4 (Upper — Chest + Back):** Bench Press, Machine Fly, Flat DB Press, Lat Pulldown, T-Bar Row, Bent-Over Row.
* **Day 5 (Lower — Legs + Core):** Leg Press, Squats, Leg Extension, Hamstring Curl, Calf Raise, Plank, Cable Crunch, Leg Raise.
* **Day 6 (Arms + Shoulders):** Incline DB Curl, Preacher Curl, Rope Hammer Curl, Rope Pushdown, Overhead Cable Extension, Lateral Raise, Shoulder Press, Face Pull.

### 5. Workout Logging Screen (`WorkoutView.tsx`) — Highest Priority
* **Exercise Cards:**
  * Exercise Title & Target Sets/Reps (e.g., `Barbell Bench Press — Target 3 × 6–10`).
  * "Last time" reference row (e.g., `Last time: 60 kg × 10, 60 kg × 9, 60 kg × 8`).
* **Interactive Set Rows:**
  * Set Number pill.
  * Large, touch-friendly numeric inputs for **Weight (kg)** and **Reps**.
  * Quick `+` / `-` incremental buttons for one-thumb weight adjustments.
  * Completion Checkmark toggle button (changes color on set completion).
  * `+ Add Set` and `Delete Set` actions.
* **Finish Workout Button:** Prominent bottom button to complete and summarize session duration and total volume.

### 6. Mock History & Settings Screens
* Basic list view of mock completed workouts in `HistoryView.tsx`.
* Basic user profile options in `SettingsView.tsx`.

---

## 🧪 Acceptance Criteria
1. Navigation transitions smoothly between Home, Workout, History, Progress, and Settings without layout shifts.
2. Home screen clearly shows today's workout plan and starting button.
3. Workout screen pre-fills suggested weight/reps from previous sessions.
4. Input fields are easy to tap and edit on mobile screen widths (360-430px).
5. Completing a set visually updates its completion state immediately.
