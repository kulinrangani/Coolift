# Workout Tracker — Implementation Specification

*Mobile-first personal workout tracker | Prepared for Antigravity implementation*

---

## 1. Product Goal

Build a mobile-first workout tracker primarily for phone use. The app must make gym logging extremely fast: open the app, see today's workout, enter weight and reps, complete the workout, and review previous performance. The app must work reliably without internet during workouts and synchronize data when connectivity returns.

---

## 2. Recommended Technology Stack

* **Frontend:** React + Vite + TypeScript + Tailwind CSS + Zustand + React Router + TanStack Query + React Hook Form + Zod
* **Offline/local:** IndexedDB using Dexie (or equivalent abstraction).
* **Backend:** Node.js + Express + TypeScript + MongoDB + Mongoose + JWT authentication.
* **Deployment:** Frontend as a PWA on Vercel or AWS Amplify; backend on EC2 using PM2 + Nginx; MongoDB Atlas.
* **Domain example:** `gym.kulin.online`

---

## 3. Product Architecture

```text
Phone/PWA → React UI → Zustand state → IndexedDB/Dexie → Sync layer → HTTPS API → Node/Express → MongoDB
```

The workout experience must be local-first. A workout in progress should never depend on a live API request. Writes should be saved locally immediately and synchronized in the background.

---

## 4. Core Navigation

Use a simple mobile navigation structure:

| Screen | Purpose |
| :--- | :--- |
| **Home** | Today's workout, weekly status, start workout |
| **Workout** | Exercise-by-exercise set logging |
| **History** | Completed workouts by date |
| **Progress** | Body weight, strength, volume, PRs |
| **Settings** | Profile, plan settings, sync/account controls |

---

## 5. Home Screen

The Home screen should immediately show the current day and the workout. Example: **Day 1 — Chest + Triceps**, number of exercises, estimated duration, and a prominent **START WORKOUT** button. Below that show the current week's completed/planned days.

---

## 6. Workout Screen — Highest Priority

The workout screen is the most frequently used screen and must be optimized for one-handed phone use. Each exercise should show the target sets/reps, previous workout values, and editable current sets.

### Example:
**Barbell Bench Press — Target 3 × 6–10**  
*Last time:* 60 kg × 10, 60 kg × 9, 60 kg × 8  
*Today:* Set 1 / Set 2 / Set 3 with weight, reps and completion controls.

Do not make the user type everything from scratch. Prefill today's suggested weight/reps from the previous completed session. Allow quick editing when the user wants to increase/decrease weight.

---

## 7. Rest Timer

Add an integrated rest timer. Compound movements default to approximately 2–3 minutes; isolation movements to 60–90 seconds. When a set is completed, provide a visible timer with `+30 seconds` and `Skip` controls.

---

## 8. Exercise Detail

Each exercise should have a detail view showing historical sessions, previous sets, best weight/reps, estimated strength progression, and optional simple charts. Keep charts lightweight and readable on mobile.

---

## 9. History Screen

Provide a calendar/list view of completed workouts. Tapping a date opens the exact workout session, including exercises, sets, weights, reps, duration and completion status.

---

## 10. Progress Screen

Track current body weight, starting weight, weight change, weekly average weight, workouts completed, streak, total sets, total workout time, and training volume. Provide exercise-level strength history and personal records.

---

## 11. Data Model

### User
`id`, `name`, `email`, `height`, `currentWeight`, `goal`, `createdAt`, `updatedAt`

### Exercise
`id`, `name`, `muscleGroup`, `category`, `instructions`, `active`

### WorkoutPlan
`id`, `name`, `dayNumber`, `title`, `exercises[]` where each item contains `exerciseId`, `order`, `targetSets`, `targetRepMin`, `targetRepMax`, `optional` flag

### WorkoutSession
`id`, `userId`, `workoutDay`, `startedAt`, `completedAt`, `duration`, `status`, `exercises[]`. Each exercise contains `exerciseId` and `sets[]`. Each set contains `setNumber`, `weight`, `reps`, `completedAt`.

### BodyWeightEntry
`id`, `userId`, `weight`, `date`, `optional note`

### SyncQueue
`localId`, `entityType`, `entityId`, `operation`, `payload`, `createdAt`, `retryCount`, `synced`

---

## 12. Initial Workout Plan Data

| Day | Workout | Exercises |
| :--- | :--- | :--- |
| **1** | Chest + Triceps | Machine/Barbell Bench Press; Incline Dumbbell Press; Machine Chest Press; Rope Triceps Pushdown; Overhead Cable Extension |
| **2** | Back + Biceps | Lat Pulldown; T-Bar Row; Bent-Over Row; Close-Grip Pulldown; Incline Dumbbell Curl; Cable Hammer Curl; EZ-Bar Close-Grip Curl |
| **3** | Shoulders + Legs | Leg Press; Hamstring Curl; Leg Extension; Calf Raise; Shoulder Press; Lateral Raise; Rear Delt Fly |
| **4** | Upper — Chest + Back | Barbell Bench Press; Machine Chest Fly (Optional); Flat Bench Dumbbell Press; Lat Pulldown; T-Bar Row; Bent-Over Row |
| **5** | Lower — Legs + Core | Leg Press; Squats (Optional); Leg Extension; Hamstring Curl; Calf Raise; Plank; Cable Crunch; Leg Raise |
| **6** | Arms + Shoulders | Incline Dumbbell Curl; Preacher Curl; Rope Hammer Curl; Rope Triceps Pushdown; Overhead Cable Extension; Lateral Raise; Shoulder Press; Face Pull (Optional) |

---

## 13. Sets and Reps

Use the following targets from the current workout plan:
* **Day 1:** Bench 3×8–10, Incline Dumbbell Press 3×8–12, Machine Chest Press 3×10–12, Rope Pushdown 3×10–15, Overhead Extension 3×10–15.
* **Day 2:** Most compounds 3×8–12, curls 3×10–15, EZ-Bar Close-Grip Curl 2×10–12.
* **Day 3:** Leg Press 3×8–12, Hamstring Curl 3×10–15, Leg Extension 3×10–15, Calf Raise 3×12–20, Shoulder Press 3×8–12, Lateral Raise 3×12–15, Rear Delt Fly 3×12–15.
* **Day 4:** Bench 3×6–10, optional fly 2×12–15, DB Press 3×8–12, Pulldown 3×8–12, T-Bar Row 3×8–12, Bent-Over Row 3×8–12.
* **Day 5:** Leg Press 3×10–12, optional Squats 2–3×8–10, Leg Extension 3×12–15, Hamstring Curl 3×10–15, Calf Raise 3×12–20, Plank 3×30–60 sec, Cable Crunch 3×10–15, Leg Raise 3×8–15.
* **Day 6:** Curls generally 3×10–15, triceps 3×10–15, Lateral Raise 3×12–15, Shoulder Press 3×8–12, optional Face Pull 2×12–15.

---

## 14. Progressive Overload

When the user reaches the top of an exercise's rep range with clean form for all working sets, suggest a small weight increase. Keep approximately 1–3 reps in reserve on most working sets. Never automatically force an increase.

---

## 15. Offline-First Requirement

This is a hard requirement. The user must be able to start a workout, record every set, use the rest timer, complete the workout and view recent workout data without an internet connection. Save all changes to IndexedDB immediately. Mark unsynchronized records as pending and synchronize when the network returns.

Sync must be idempotent. Use client-generated IDs or operation IDs so retrying a request does not create duplicate workout sessions or sets.

---

## 16. API Design

Suggested endpoints:
```http
POST /api/auth/login
POST /api/auth/register
GET  /api/workout-plan/current
GET  /api/exercises
GET  /api/workouts/history
GET  /api/workouts/:id
POST /api/workouts
PUT  /api/workouts/:id
POST /api/sync
GET  /api/progress/summary
GET  /api/progress/exercises/:exerciseId
POST /api/body-weight
GET  /api/body-weight
```

---

## 17. State Management

Use Zustand for UI/session state such as active workout, timer, current exercise, draft set values and local sync status. Use TanStack Query for server state and cache invalidation. IndexedDB should be the durable local source for workout-in-progress data.

---

## 18. Mobile UX Requirements

Design mobile-first at approximately 360–430px widths. Use large touch targets, sticky exercise headers where useful, bottom navigation, large numeric inputs for weight/reps, minimal typing, clear completion states, and readable typography. Avoid desktop-style dense tables on the workout screen.

The user should be able to log a set in a few taps. Preserve the keyboard-friendly numeric input experience and avoid unnecessary confirmation dialogs.

---

## 19. PWA and Deployment

Configure installable PWA behavior, manifest, icons, service worker caching and offline application shell. Test installation on Android and iPhone. Frontend can be deployed to Vercel or AWS Amplify. Backend should run behind Nginx with HTTPS using PM2 on EC2. MongoDB Atlas is the database.

---

## 20. Security

Use JWT authentication, hashed passwords, HTTPS, request validation with Zod/Joi, rate limiting on auth endpoints, CORS configuration, environment variables, and server-side ownership checks so a user can access only their own workout/session/progress data.

---

## 21. Development Phases

* **Phase 1 — MVP UI:** Project setup, mobile layout, navigation, workout plan, workout screen, set logging, previous values.
* **Phase 2 — Local-first:** IndexedDB/Dexie, offline workout state, rest timer, local history.
* **Phase 3 — Backend:** Auth, MongoDB models, APIs, workout sync, history and progress.
* **Phase 4 — PWA:** Service worker, manifest, install testing, offline shell, production deployment.
* **Phase 5 — Progress:** Charts, PRs, body weight, volume, streaks.
* **Phase 6 — Enhancements:** Exercise notes, automatic progression suggestions, nutrition, measurements and optional AI features.

---

## 22. V1 Acceptance Criteria

1. User can install the app on a phone.
2. User can open the app and immediately see today's workout.
3. User can start a workout and record weight/reps for every set.
4. Previous workout values are shown for each exercise.
5. Workout data remains available without internet.
6. Completed workouts appear in history.
7. Data synchronizes when internet becomes available.
8. Duplicate sync operations do not create duplicate records.
9. Rest timer works during workouts.
10. UI is comfortable for one-handed mobile use.
11. User can review basic progress and body weight.

---

## 23. Important Product Principle

```text
Open → Today's Workout → Log Set → Rest → Next Set → Complete → Sync
```

The application should optimize this flow before adding advanced features. Avoid overengineering the first release.
