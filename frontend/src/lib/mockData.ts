import type { WorkoutDayPlan, WorkoutSession, UserProfile } from './types';

export const INITIAL_USER: UserProfile = {
  name: 'Kulin Rangani',
  email: 'kulin@example.com',
  heightCm: 178,
  currentWeightKg: 74.5,
  goal: 'Hypertrophy & Strength',
};

export const WORKOUT_PLANS: WorkoutDayPlan[] = [
  {
    dayNumber: 1,
    title: 'Day 1 — Chest + Triceps',
    subtitle: 'Chest Push & Triceps Isolation',
    estimatedMinutes: 45,
    exercises: [
      { id: 'ex-1', name: 'Barbell Bench Press', muscleGroup: 'Chest', category: 'compound', targetSets: 3, targetRepMin: 6, targetRepMax: 10 },
      { id: 'ex-2', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-3', name: 'Machine Chest Press', muscleGroup: 'Chest', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 12 },
      { id: 'ex-4', name: 'Rope Triceps Pushdown', muscleGroup: 'Triceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-5', name: 'Overhead Cable Extension', muscleGroup: 'Triceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
    ],
  },
  {
    dayNumber: 2,
    title: 'Day 2 — Back + Biceps',
    subtitle: 'Back Width, Thickness & Biceps',
    estimatedMinutes: 50,
    exercises: [
      { id: 'ex-6', name: 'Lat Pulldown', muscleGroup: 'Back', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-7', name: 'T-Bar Row', muscleGroup: 'Back', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-8', name: 'Bent-Over Row', muscleGroup: 'Back', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-9', name: 'Close-Grip Pulldown', muscleGroup: 'Back', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-10', name: 'Incline Dumbbell Curl', muscleGroup: 'Biceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-11', name: 'Cable Hammer Curl', muscleGroup: 'Biceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-12', name: 'EZ-Bar Close-Grip Curl', muscleGroup: 'Biceps', category: 'isolation', targetSets: 2, targetRepMin: 10, targetRepMax: 12 },
    ],
  },
  {
    dayNumber: 3,
    title: 'Day 3 — Shoulders + Legs',
    subtitle: 'Quads, Hams, Calves & Shoulders',
    estimatedMinutes: 55,
    exercises: [
      { id: 'ex-13', name: 'Leg Press', muscleGroup: 'Legs', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-14', name: 'Hamstring Curl', muscleGroup: 'Legs', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-15', name: 'Leg Extension', muscleGroup: 'Legs', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-16', name: 'Calf Raise', muscleGroup: 'Legs', category: 'isolation', targetSets: 3, targetRepMin: 12, targetRepMax: 20 },
      { id: 'ex-17', name: 'Overhead Shoulder Press', muscleGroup: 'Shoulders', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-18', name: 'Lateral Raise', muscleGroup: 'Shoulders', category: 'isolation', targetSets: 3, targetRepMin: 12, targetRepMax: 15 },
      { id: 'ex-19', name: 'Rear Delt Fly', muscleGroup: 'Shoulders', category: 'isolation', targetSets: 3, targetRepMin: 12, targetRepMax: 15 },
    ],
  },
  {
    dayNumber: 4,
    title: 'Day 4 — Upper (Chest + Back)',
    subtitle: 'Upper Body Hypertrophy Focus',
    estimatedMinutes: 50,
    exercises: [
      { id: 'ex-1', name: 'Barbell Bench Press', muscleGroup: 'Chest', category: 'compound', targetSets: 3, targetRepMin: 6, targetRepMax: 10 },
      { id: 'ex-20', name: 'Machine Chest Fly', muscleGroup: 'Chest', category: 'isolation', targetSets: 2, targetRepMin: 12, targetRepMax: 15, isOptional: true },
      { id: 'ex-21', name: 'Flat Bench Dumbbell Press', muscleGroup: 'Chest', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-6', name: 'Lat Pulldown', muscleGroup: 'Back', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-7', name: 'T-Bar Row', muscleGroup: 'Back', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-8', name: 'Bent-Over Row', muscleGroup: 'Back', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
    ],
  },
  {
    dayNumber: 5,
    title: 'Day 5 — Lower (Legs + Core)',
    subtitle: 'Lower Body Strength & Core',
    estimatedMinutes: 50,
    exercises: [
      { id: 'ex-13', name: 'Leg Press', muscleGroup: 'Legs', category: 'compound', targetSets: 3, targetRepMin: 10, targetRepMax: 12 },
      { id: 'ex-22', name: 'Barbell Squats', muscleGroup: 'Legs', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 10, isOptional: true },
      { id: 'ex-15', name: 'Leg Extension', muscleGroup: 'Legs', category: 'isolation', targetSets: 3, targetRepMin: 12, targetRepMax: 15 },
      { id: 'ex-14', name: 'Hamstring Curl', muscleGroup: 'Legs', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-16', name: 'Calf Raise', muscleGroup: 'Legs', category: 'isolation', targetSets: 3, targetRepMin: 12, targetRepMax: 20 },
      { id: 'ex-23', name: 'Plank Hold', muscleGroup: 'Core', category: 'isolation', targetSets: 3, targetRepMin: 30, targetRepMax: 60 },
      { id: 'ex-24', name: 'Cable Crunch', muscleGroup: 'Core', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-25', name: 'Hanging Leg Raise', muscleGroup: 'Core', category: 'isolation', targetSets: 3, targetRepMin: 8, targetRepMax: 15 },
    ],
  },
  {
    dayNumber: 6,
    title: 'Day 6 — Arms + Shoulders',
    subtitle: 'Arms Pump & Shoulder Width',
    estimatedMinutes: 45,
    exercises: [
      { id: 'ex-10', name: 'Incline Dumbbell Curl', muscleGroup: 'Biceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-26', name: 'Preacher Curl', muscleGroup: 'Biceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-27', name: 'Rope Hammer Curl', muscleGroup: 'Biceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-4', name: 'Rope Triceps Pushdown', muscleGroup: 'Triceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-5', name: 'Overhead Cable Extension', muscleGroup: 'Triceps', category: 'isolation', targetSets: 3, targetRepMin: 10, targetRepMax: 15 },
      { id: 'ex-18', name: 'Lateral Raise', muscleGroup: 'Shoulders', category: 'isolation', targetSets: 3, targetRepMin: 12, targetRepMax: 15 },
      { id: 'ex-17', name: 'Overhead Shoulder Press', muscleGroup: 'Shoulders', category: 'compound', targetSets: 3, targetRepMin: 8, targetRepMax: 12 },
      { id: 'ex-28', name: 'Face Pull', muscleGroup: 'Shoulders', category: 'isolation', targetSets: 2, targetRepMin: 12, targetRepMax: 15, isOptional: true },
    ],
  },
];

export const PREVIOUS_VALUES: Record<string, { weight: number; reps: number }[]> = {
  'ex-1': [
    { weight: 60, reps: 10 },
    { weight: 60, reps: 9 },
    { weight: 60, reps: 8 },
  ],
  'ex-2': [
    { weight: 22.5, reps: 10 },
    { weight: 22.5, reps: 10 },
    { weight: 22.5, reps: 8 },
  ],
  'ex-3': [
    { weight: 55, reps: 12 },
    { weight: 55, reps: 11 },
    { weight: 55, reps: 10 },
  ],
  'ex-4': [
    { weight: 25, reps: 15 },
    { weight: 25, reps: 14 },
    { weight: 25, reps: 12 },
  ],
  'ex-5': [
    { weight: 20, reps: 12 },
    { weight: 20, reps: 12 },
    { weight: 20, reps: 10 },
  ],
  'ex-6': [
    { weight: 50, reps: 10 },
    { weight: 50, reps: 10 },
    { weight: 50, reps: 9 },
  ],
  'ex-13': [
    { weight: 120, reps: 12 },
    { weight: 120, reps: 10 },
    { weight: 120, reps: 10 },
  ],
};

export const MOCK_PAST_SESSIONS: WorkoutSession[] = [
  {
    id: 'session-101',
    dayNumber: 1,
    workoutTitle: 'Day 1 — Chest + Triceps',
    startedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 2 + 2700000).toISOString(),
    durationSeconds: 2700,
    status: 'completed',
    exercises: [
      {
        exerciseId: 'ex-1',
        exerciseName: 'Barbell Bench Press',
        targetSets: 3,
        targetRepMin: 6,
        targetRepMax: 10,
        category: 'compound',
        sets: [
          { setNumber: 1, weight: 60, reps: 10, isCompleted: true },
          { setNumber: 2, weight: 60, reps: 9, isCompleted: true },
          { setNumber: 3, weight: 60, reps: 8, isCompleted: true },
        ],
      },
      {
        exerciseId: 'ex-2',
        exerciseName: 'Incline Dumbbell Press',
        targetSets: 3,
        targetRepMin: 8,
        targetRepMax: 12,
        category: 'compound',
        sets: [
          { setNumber: 1, weight: 22.5, reps: 10, isCompleted: true },
          { setNumber: 2, weight: 22.5, reps: 10, isCompleted: true },
          { setNumber: 3, weight: 22.5, reps: 8, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: 'session-100',
    dayNumber: 6,
    workoutTitle: 'Day 6 — Arms + Shoulders',
    startedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 4 + 2500000).toISOString(),
    durationSeconds: 2500,
    status: 'completed',
    exercises: [
      {
        exerciseId: 'ex-10',
        exerciseName: 'Incline Dumbbell Curl',
        targetSets: 3,
        targetRepMin: 10,
        targetRepMax: 15,
        category: 'isolation',
        sets: [
          { setNumber: 1, weight: 14, reps: 12, isCompleted: true },
          { setNumber: 2, weight: 14, reps: 12, isCompleted: true },
          { setNumber: 3, weight: 14, reps: 10, isCompleted: true },
        ],
      },
    ],
  },
];
