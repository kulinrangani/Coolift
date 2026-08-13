# Phase 2 Plan — Local-First IndexedDB & Rest Timer

*Focus: Client-side persistent storage with Dexie (IndexedDB), zero-latency active workout persistence, and an interactive rest timer.*

---

## 🎯 Phase Goal
Ensure all user data and active gym workouts survive page reloads, browser quits, or offline gym environments without requiring server connectivity. Add an integrated rest timer that triggers automatically upon set completion.

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
    super('GymTrackerDB');
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

### 3. Integrated Rest Timer Component (`RestTimer.tsx`)
* **Trigger:** Automatically starts whenever a user completes a set checkmark.
* **Smart Defaults:**
  * Compound movements (Bench Press, Squat, Deadlift, Lat Pulldown): **120 – 180 seconds**.
  * Isolation movements (Curls, Pushdowns, Lateral Raises): **60 – 90 seconds**.
* **UI Controls:**
  * Sticky bottom overlay/drawer showing countdown (`01:45`).
  * `+30s` button to extend rest.
  * `Skip` button to immediately dismiss the timer.
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
3. Tapping `+30s` adds 30 seconds to the countdown; tapping `Skip` stops the timer immediately.
4. Completed workouts are saved to IndexedDB and listed in the History tab without network requests.
