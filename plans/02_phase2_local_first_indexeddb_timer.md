# Phase 2 Plan — Local-First IndexedDB & COOLIFT Rest Timer

*Focus: Client-side persistent storage with Dexie (IndexedDB), zero-latency active workout persistence, and the COOLIFT Rest Timer.*

---

## 🎯 Phase Goal
Ensure all user data and active gym workouts survive page reloads, browser quits, or offline gym environments without requiring server connectivity. Add the integrated COOLIFT Rest Timer matching Section 9 of the Design System.

---

## 📋 Task Breakdown

### 1. IndexedDB Schema Setup (`src/db/db.ts`)
Install `dexie` and define the client database schema:
```typescript
class GymDatabase extends Dexie {
  workoutPlans!: Table<WorkoutPlan>;
  workoutSessions!: Table<WorkoutSession>;
  exercises!: Table<Exercise>;
  bodyWeightEntries!: Table<BodyWeightEntry>;
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super('COOLIFT_GymTrackerDB');
    this.version(1).stores({
      workoutPlans: 'id, dayNumber',
      workoutSessions: 'id, userId, workoutDay, startedAt, completedAt, status',
      exercises: 'id, name, muscleGroup, category',
      bodyWeightEntries: 'id, date',
      syncQueue: 'localId, entityType, synced, createdAt'
    });
  }
}
```

### 2. State & Storage Integration (`useWorkoutStore.ts`)
* Connect Zustand active workout state to Dexie.
* Save draft set values, current set completion, and start timestamps to IndexedDB on every keystroke/tap.
* Implement session restoration: If the user re-opens the app during an unfinished workout, show a prompt: `"Resume active workout (Started 15 mins ago)?"`.

### 3. COOLIFT Rest Timer Component (`RestTimer.tsx`) — Spec Section 9
* **Trigger:** Automatically launches whenever a set checkmark is completed in `SetRow`.
* **Smart Defaults:**
  * Compound movements (Bench Press, Squat, Deadlift, Lat Pulldown): **120 – 180 seconds**.
  * Isolation movements (Curls, Pushdowns, Lateral Raises): **60 – 90 seconds**.
* **Visual Display & Typography:**
  * Big high-contrast numeric display (e.g., `01:32 REST`) in primary accent color (`#2688FF`).
* **Controls:**
  * `[ +30 sec ]` button to extend rest.
  * `[ Skip ]` button to immediately dismiss the timer.
* **Notification / Alert:**
  * Web Vibration API (`navigator.vibrate([200, 100, 200])`) when timer finishes.
  * Subtle audio beep on timer expiration.

### 4. Local History & Past Session Viewer
* Update `HistoryView.tsx` to read completed `WorkoutSession` records directly from IndexedDB.
* Allow clicking any history item to see the breakdown of sets, weights, reps, and total workout duration.

---

## 🧪 Acceptance Criteria
1. Closing the browser mid-workout and reopening restores the active session without losing any entered weight/reps.
2. Checking off a set automatically launches the rest timer with correct movement defaults.
3. Tapping `+30 sec` adds 30 seconds to the countdown; tapping `Skip` stops the timer immediately.
4. Completed workouts are saved to IndexedDB and listed in the History tab without network requests.
