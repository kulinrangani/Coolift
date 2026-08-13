# Phase 6 Plan — Progress Analytics & Personal Records

*Focus: Body weight tracking, strength progression charts, estimated 1RM analytics, training volume metrics, and PR highlights.*

---

## 🎯 Phase Goal
Provide rich visual feedback and motivation by tracking body weight trends, calculating estimated 1RM strength progression per exercise, showing weekly total volume, and celebrating personal records (PRs).

---

## 📋 Task Breakdown

### 1. Body Weight Logger & Visualizer (`BodyWeightTracker.tsx`)
* Quick logging modal: Input weight (kg), date, optional note (e.g. "Morning fasted").
* Statistics summary card:
  * Current Weight.
  * Starting Weight & Total Weight Change.
  * 7-Day Moving Average Weight.
* Interactive line chart displaying weight trends over time.

### 2. Estimated 1RM & Strength History (`StrengthProgression.tsx`)
* Calculate estimated 1-Rep Max (1RM) using Epley Formula:
  $$\text{1RM} = \text{weight} \times \left(1 + \frac{\text{reps}}{30}\right)$$
* Dropdown selection for specific exercises (e.g. *Bench Press*, *Lat Pulldown*).
* Line chart showing 1RM progression across completed sessions.

### 3. Training Volume & Consistency Stats (`VolumeMetrics.tsx`)
* Weekly total volume (Total kg lifted across all exercises: $\sum \text{weight} \times \text{reps}$).
* Weekly completed set breakdown.
* Workout streak counter (consecutive weeks meeting target workout frequency).

### 4. Personal Record (PR) Badges (`PRHighlights.tsx`)
* Automatically scan completed sessions to extract personal records for each exercise:
  * 🏆 **Max Weight Record:** Heaviest weight successfully lifted.
  * ⚡ **Max Volume Set Record:** Highest single-set tonnage ($\text{weight} \times \text{reps}$).
* Visual PR badge on set entry during workouts when user breaks a personal record!

---

## 🧪 Acceptance Criteria
1. Logging body weight updates statistics cards and chart immediately.
2. 1RM calculations accurately compute formulas and display progression graphs.
3. PR badges appear when entering a record-breaking set on the Workout screen.
4. All analytics load fast and remain fully responsive on mobile screen sizes.
