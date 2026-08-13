# Phase 1 Plan — MVP Frontend UI & Component Architecture

*Focus: COOLIFT Midnight Design System, reusable component library, Zod frontend validation, logo assets, mobile navigation shell, Home Screen, and Workout Screen set logging.*

---

## 🎯 Phase Goal
Implement the mobile-first **COOLIFT** frontend interface strictly aligned with the **COOLIFT UI / UX Design System** using the **Midnight Theme** (`#070B14`). The codebase must adhere to clean code principles, modular component reusability, strict TypeScript typing, and input validation.

---

## 🧩 Reusable Component Library Architecture (`src/components/`)

### 1. Common Atomic Components (`src/components/common/`)
* **`PrimaryButton.tsx`:** Standardized CTA button with large touch target ($\ge 44\text{px}$), loading state spinner, active scale effect, and variant styling (primary `#2688FF`, secondary `#06B6D4`, outline, danger).
* **`Input.tsx`:** High-contrast numeric and text input field with error messaging label, focus ring, and clear button.
* **`StatCard.tsx`:** Dashboard metric card showing label, large value, icon, and trend indicator.
* **`BottomSheet.tsx`:** Touch-draggable mobile bottom modal for quick secondary actions.
* **`EmptyState.tsx`:** Clean illustration state with text description and call-to-action button.

### 2. Workout Components (`src/components/workout/`)
* **`WorkoutCard.tsx`:** Reusable summary card for today's workout split, duration, exercise count, and start button.
* **`ExerciseCard.tsx`:** Exercise header container with target sets/reps, last session performance summary, and form note dropdown.
* **`SetRow.tsx`:** Interactive set logging row featuring set index, prefilled suggested values, numeric weight/reps input, quick `+` / `-` adjustment controls, and completion checkbox toggle (`#10B981`).

---

## 🛡️ Frontend Input Validation (`src/lib/validation.ts`)

Integrate `yup` validation schemas for all user inputs:
* **Set Entry Validation (`setRowSchema`):**
  * `weight`: Required number, min $0.25\text{ kg}$, max $500\text{ kg}$.
  * `reps`: Required integer, min $1$, max $100$.
* **Body Weight Validation (`bodyWeightSchema`):**
  * `weight`: Required number, min $20.0\text{ kg}$, max $300.0\text{ kg}$.
* Synchronous validation helpers (`validateSetRow`, `validateBodyWeight`) returning structured error feedback.

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
2. Clean modular components (`PrimaryButton`, `StatCard`, `ExerciseCard`, `SetRow`) are used throughout without code duplication.
3. Invalid weights or reps (e.g. negative numbers or text) are caught and flagged by Zod validation schemas.
4. Set checkmark toggle provides instant visual success feedback (`#10B981`).
5. Layout is perfectly responsive on mobile screens (360px – 430px).
