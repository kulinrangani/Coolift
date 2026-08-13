import { useState, useEffect } from 'react';
import type { NavTab, WorkoutSession, SetEntry, ExerciseSession, UserProfile } from '../lib/types';
import { WORKOUT_PLANS, PREVIOUS_VALUES, MOCK_PAST_SESSIONS, INITIAL_USER } from '../lib/mockData';

const COMPLETED_SESSIONS_STORAGE_KEY = 'coolift_completed_sessions';

export function useWorkoutStore() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [userProfile] = useState<UserProfile>(INITIAL_USER);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(1); // Day 1 default
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);
  
  // Load completed sessions from localStorage or default to MOCK_PAST_SESSIONS
  const [completedSessions, setCompletedSessions] = useState<WorkoutSession[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse completed sessions from localStorage:', e);
    }
    return MOCK_PAST_SESSIONS;
  });

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Sync completedSessions to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_SESSIONS_STORAGE_KEY, JSON.stringify(completedSessions));
    } catch (e) {
      console.warn('Failed to save completed sessions to localStorage:', e);
    }
  }, [completedSessions]);

  // Active workout timer tick
  useEffect(() => {
    let interval: any = null;
    if (activeSession && activeSession.status === 'in-progress') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeSession?.status]);

  // Start workout for a given day number (1-6)
  const startWorkout = (dayNumber: number) => {
    const plan = WORKOUT_PLANS.find((p) => p.dayNumber === dayNumber) || WORKOUT_PLANS[0];

    const exercises: ExerciseSession[] = plan.exercises.map((ex) => {
      const prevValues = PREVIOUS_VALUES[ex.id] || [];
      const sets: SetEntry[] = [];

      for (let i = 1; i <= ex.targetSets; i++) {
        const prev = prevValues[i - 1];
        sets.push({
          setNumber: i,
          weight: prev ? prev.weight : 50,
          reps: prev ? prev.reps : 10,
          isCompleted: false,
          previousWeight: prev ? prev.weight : undefined,
          previousReps: prev ? prev.reps : undefined,
        });
      }

      return {
        exerciseId: ex.id,
        exerciseName: ex.name,
        targetSets: ex.targetSets,
        targetRepMin: ex.targetRepMin,
        targetRepMax: ex.targetRepMax,
        category: ex.category,
        sets,
      };
    });

    const newSession: WorkoutSession = {
      id: `session-${Date.now()}`,
      dayNumber: plan.dayNumber,
      workoutTitle: plan.title,
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      status: 'in-progress',
      exercises,
    };

    setActiveSession(newSession);
    setElapsedSeconds(0);
    setActiveTab('workout');
  };

  const updateSet = (exerciseId: string, setNumber: number, field: 'weight' | 'reps', value: number | '') => {
    if (!activeSession) return;
    setActiveSession((prev) => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.exerciseId !== exerciseId) return ex;
        const updatedSets = ex.sets.map((s) => {
          if (s.setNumber !== setNumber) return s;
          return { ...s, [field]: value };
        });
        return { ...ex, sets: updatedSets };
      });
      return { ...prev, exercises: updatedExercises };
    });
  };

  const toggleSetComplete = (exerciseId: string, setNumber: number): { exerciseCategory?: 'compound' | 'isolation'; newlyCompleted?: boolean } => {
    let resultCategory: 'compound' | 'isolation' | undefined;
    let newlyCompleted = false;

    if (!activeSession) return { newlyCompleted: false };

    setActiveSession((prev) => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.exerciseId !== exerciseId) return ex;
        const updatedSets = ex.sets.map((s) => {
          if (s.setNumber !== setNumber) return s;
          const nextState = !s.isCompleted;
          if (nextState) {
            newlyCompleted = true;
            resultCategory = ex.category;
          }
          return { ...s, isCompleted: nextState };
        });
        return { ...ex, sets: updatedSets };
      });
      return { ...prev, exercises: updatedExercises };
    });

    return { exerciseCategory: resultCategory, newlyCompleted };
  };

  const addSetToExercise = (exerciseId: string) => {
    if (!activeSession) return;
    setActiveSession((prev) => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.exerciseId !== exerciseId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSetNumber = ex.sets.length + 1;
        const newSet: SetEntry = {
          setNumber: newSetNumber,
          weight: lastSet ? lastSet.weight : 50,
          reps: lastSet ? lastSet.reps : 10,
          isCompleted: false,
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      });
      return { ...prev, exercises: updatedExercises };
    });
  };

  const removeSetFromExercise = (exerciseId: string, setNumber: number) => {
    if (!activeSession) return;
    setActiveSession((prev) => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.exerciseId !== exerciseId) return ex;
        if (ex.sets.length <= 1) return ex; // Keep at least 1 set
        const filteredSets = ex.sets
          .filter((s) => s.setNumber !== setNumber)
          .map((s, idx) => ({ ...s, setNumber: idx + 1 }));
        return { ...ex, sets: filteredSets };
      });
      return { ...prev, exercises: updatedExercises };
    });
  };

  const finishWorkout = () => {
    if (!activeSession) return;
    const completed: WorkoutSession = {
      ...activeSession,
      completedAt: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
      status: 'completed',
    };
    setCompletedSessions([completed, ...completedSessions]);
    setActiveSession(null);
    setElapsedSeconds(0);
    setActiveTab('history');
  };

  const cancelWorkout = () => {
    setActiveSession(null);
    setElapsedSeconds(0);
    setActiveTab('home');
  };

  const clearHistory = () => {
    setCompletedSessions([]);
    try {
      localStorage.removeItem(COMPLETED_SESSIONS_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear history from localStorage:', e);
    }
  };

  return {
    activeTab,
    setActiveTab,
    userProfile,
    currentDayIndex,
    setCurrentDayIndex,
    activeSession,
    completedSessions,
    elapsedSeconds,
    startWorkout,
    updateSet,
    toggleSetComplete,
    addSetToExercise,
    removeSetFromExercise,
    finishWorkout,
    cancelWorkout,
    clearHistory,
  };
}
