# Phase 3 Plan — Backend API & JWT Authentication

*Focus: Node.js, Express, TypeScript, MongoDB with Mongoose schemas, JWT authentication, and RESTful API endpoints.*

---

## 🎯 Phase Goal
Build a robust, secure, and type-safe backend API that handles user authentication, stores workout plans and completed sessions in MongoDB Atlas, and provides endpoints for data synchronization.

---

## 📋 Task Breakdown

### 1. Backend Project Architecture Setup
Create directory structure inside `backend/`:
```text
backend/
├── src/
│   ├── config/          # DB connection & environment vars
│   ├── controllers/     # Route handler logic
│   ├── middleware/      # Auth, error handling, Zod validation
│   ├── models/          # Mongoose data schemas
│   ├── routes/          # API route definitions
│   ├── types/           # TypeScript interfaces
│   └── index.ts         # Server entry point
```

### 2. Mongoose Schemas (`backend/src/models/`)
* **`User.ts`:** `name`, `email` (unique), `passwordHash`, `height`, `currentWeight`, `goal`, `createdAt`, `updatedAt`.
* **`Exercise.ts`:** `name`, `muscleGroup`, `category`, `instructions`, `active`.
* **`WorkoutPlan.ts`:** `id`, `name`, `dayNumber`, `title`, `exercises` array (`exerciseId`, `order`, `targetSets`, `targetRepMin`, `targetRepMax`, `optional`).
* **`WorkoutSession.ts`:** `userId`, `workoutDay`, `startedAt`, `completedAt`, `duration`, `status`, `exercises` array (`exerciseId`, `sets` array of `setNumber`, `weight`, `reps`, `completedAt`).
* **`BodyWeightEntry.ts`:** `userId`, `weight`, `date`, `note`.

### 3. Security & Authentication (`authMiddleware.ts`)
* JWT token creation and verification (`jsonwebtoken`).
* Password hashing with `bcryptjs`.
* Request payload validation using `Zod` schemas.
* Server-side user ownership checks ensuring users only query/modify their own data.

### 4. API Endpoints Specification

#### Auth Routes:
* `POST /api/auth/register` — Create new user account.
* `POST /api/auth/login` — Authenticate and return JWT token.
* `GET /api/auth/me` — Return current logged-in user profile.

#### Workout & Exercise Routes:
* `GET /api/exercises` — List available master exercises.
* `GET /api/workout-plan/current` — Fetch active 6-day plan.
* `GET /api/workouts/history` — Get user's past completed workout sessions.
* `GET /api/workouts/:id` — Get single workout session details.
* `POST /api/workouts` — Save completed workout session.
* `PUT /api/workouts/:id` — Update existing workout session.

#### Body Weight Routes:
* `POST /api/body-weight` — Log new body weight entry.
* `GET /api/body-weight` — Fetch body weight history.

---

## 🧪 Acceptance Criteria
1. Server compiles cleanly with TypeScript and connects to MongoDB Atlas.
2. User registration and login return valid JWTs and handle duplicate email errors gracefully.
3. Protected routes reject unauthorized requests with HTTP 401/403.
4. CRUD operations for workout sessions write correctly to MongoDB with full type safety.
