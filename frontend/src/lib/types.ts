export type NavTab = 'home' | 'workout' | 'history' | 'progress' | 'settings';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  category: 'compound' | 'isolation';
  instructions?: string;
  targetSets: number;
  targetRepMin: number;
  targetRepMax: number;
  isOptional?: boolean;
}

export interface WorkoutDayPlan {
  dayNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  exercises: Exercise[];
}

export interface SetEntry {
  setNumber: number;
  weight: number | '';
  reps: number | '';
  isCompleted: boolean;
  previousWeight?: number;
  previousReps?: number;
}

export interface ExerciseSession {
  exerciseId: string;
  exerciseName: string;
  targetSets: number;
  targetRepMin: number;
  targetRepMax: number;
  category: 'compound' | 'isolation';
  sets: SetEntry[];
}

export interface WorkoutSession {
  id: string;
  dayNumber: number;
  workoutTitle: string;
  startedAt: string; // ISO String
  completedAt?: string;
  durationSeconds: number;
  status: 'in-progress' | 'completed' | 'abandoned';
  exercises: ExerciseSession[];
}

export interface BodyWeightEntry {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  heightCm: number;
  currentWeightKg: number;
  goal: string;
}
