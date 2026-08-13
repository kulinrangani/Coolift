# Phase 1 Plan — MVP Frontend UI & Design System Integration

*Focus: COOLIFT Midnight Design System, Tailwind Midnight theme tokens, logo assets, mobile navigation shell, Home Screen, and Workout Screen set logging.*

---

## 🎯 Phase Goal
Implement the mobile-first **COOLIFT** frontend interface strictly aligned with the **COOLIFT UI / UX Design System** using exclusively the **Midnight Theme** (`#070B14`). The UI must feature integrated logo assets, 44px minimum touch targets, large typography for workout metrics, and zero layout shift.

---

## 🎨 Theme Tokens & Tailwind Configuration

### 1. Midnight Theme Tokens (Exclusive Theme)
Configure `tailwind.config.js` with COOLIFT Midnight color tokens:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        coolift: {
          bg: '#070B14',          // App background
          surface: '#0F1726',     // Cards / Sections
          elevated: '#151F32',    // Inputs / Elevated cards
          primary: '#2688FF',     // Primary actions / Active states
          secondary: '#06B6D4',   // Secondary accent
          accent: '#8B5CF6',      // Highlights
          success: '#10B981',     // Completed sets / success
          warning: '#F59E0B',     // Attention
          error: '#EF4444',       // Errors
          text: '#F8FAFC',        // Main text
          muted: '#94A3B8',       // Supporting text
        }
      }
    }
  }
}
```

---

## 📋 Task Breakdown

### 1. Logo & Header Component (`Header.tsx`)
* Embed `01_logo_primary.png` for top navigation bar / desktop view and `02_logo_icon.png` for compact header views and PWA app icons.
* Display user avatar & greeting (*"Welcome back, Kulin"*).

### 2. Mobile Navigation Shell (`AppShell.tsx` & `BottomNavigation.tsx`)
* **`AppShell`:** Safe area padding, maximum width container centered on tablet/desktop viewports (max-w-md), Midnight dark theme background (`bg-coolift-bg`).
* **`BottomNavigation`:** 5 mobile navigation items with 44px+ touch targets:
  * 🏠 **Home:** Today's workout & quick stats.
  * 🏋️ **Workout:** Active workout set logging.
  * 📜 **History:** Past completed sessions calendar.
  * 📊 **Progress:** Body weight & volume metrics.
  * ⚙️ **Settings:** Profile preferences & sync controls.

### 3. Home Screen (`HomeView.tsx`) — Design Spec Section 7
* **Today's Workout Card (`WorkoutCard.tsx`):**
  * Day Title: `Day 1 — Chest + Triceps`
  * Subtext: `5 Exercises • ~45 min`
  * Action Button: Prominent `START WORKOUT` button in `#2688FF` primary accent.
* **Weekly Overview Bar:** 7-day pill row showing completed, planned, and rest states.
* **Quick Stats Cards (`StatCard.tsx`):**
  * Current Weight (e.g. `74.5 kg`)
  * Workouts Completed This Week (e.g. `3 / 6`)
  * Current Streak (e.g. `4 weeks 🔥`)

### 4. Workout Screen (`WorkoutView.tsx`) — Design Spec Section 8
* **Exercise Card (`ExerciseCard.tsx`):**
  * Exercise name header (e.g., `Barbell Bench Press`).
  * Target sets & reps badge (e.g., `Target: 3 × 6–10`).
  * Last time reference banner: `Last time: 60 kg × 10, 60 kg × 9, 60 kg × 8`.
* **Set Row Component (`SetRow.tsx`):**
  * Set Number indicator (`Set 1`, `Set 2`, `Set 3`).
  * Prefilled Weight & Reps inputs using previous performance.
  * Large touch-friendly numeric inputs for Weight and Reps with quick adjustment buttons (`+` / `-`).
  * Set Completion Toggle Button: Turns vibrant green (`#10B981`) upon checkmark toggle.
* **Bottom Workout Action Bar:**
  * Add exercise button, Cancel workout option, and `FINISH WORKOUT` CTA.

---

## 🧪 Acceptance Criteria
1. UI exactingly reflects COOLIFT Midnight color palette (`#070B14` bg, `#0F1726` surface, `#2688FF` primary).
2. Header displays COOLIFT logos (`01_logo_primary.png` / `02_logo_icon.png`).
3. Touch targets for all buttons and inputs are 44px or larger.
4. Set checkmark toggle provides instant visual success feedback (`#10B981`).
5. Layout is perfectly responsive on mobile screens (360px – 430px).
