# Phase 3 Plan — Backend API, Auth & Zod Validation Middleware

*Focus: Node.js, Express, TypeScript, MongoDB with Mongoose schemas, JWT authentication, and Zod validation middleware.*

---

## 🎯 Phase Goal
Build a robust, clean, type-safe backend API with modular routes, controllers, and services. Enforce strict Zod schema validation on every request payload to reject invalid data before it reaches database queries.

---

## 🛡️ Request Validation Architecture (`middleware/validate.ts`)

Create a reusable Express middleware using `Zod`:
```typescript
export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      return next(error);
    }
  };
```

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
│   ├── schemas/         # Zod request validation schemas
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
* Server-side user ownership checks ensuring users only query/modify their own data.

### 4. API Endpoints & Validation Schemas

#### Auth Routes:
* `POST /api/auth/register` — Validate `registerSchema` (valid email, min 8-char password, name).
* `POST /api/auth/login` — Validate `loginSchema` (email & password).
* `GET /api/auth/me` — Return current logged-in user profile.

#### Workout & Exercise Routes:
* `GET /api/exercises` — List available master exercises.
* `GET /api/workout-plan/current` — Fetch active 6-day plan.
* `GET /api/workouts/history` — Get user's past completed workout sessions.
* `GET /api/workouts/:id` — Get single workout session details.
* `POST /api/workouts` — Validate `workoutSessionSchema` (valid exercise IDs, numeric set bounds).
* `PUT /api/workouts/:id` — Update existing workout session.

#### Body Weight Routes:
* `POST /api/body-weight` — Validate `bodyWeightSchema` (weight $20 - 300\text{ kg}$, valid ISO date string).
* `GET /api/body-weight` — Fetch body weight history.

---

## 🧪 Acceptance Criteria
1. Server compiles cleanly with TypeScript and connects to MongoDB Atlas.
2. Every endpoint validates incoming request data using Zod schemas and returns structured HTTP 400 validation error responses.
3. User registration and login return valid JWTs and handle duplicate email errors gracefully.
4. Protected routes reject unauthorized requests with HTTP 401/403.
5. Code follows clean controller-service-model separation without duplicate DB logic.
