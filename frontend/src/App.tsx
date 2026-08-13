import { AppShell } from './components/navigation/AppShell';
import { Header } from './components/navigation/Header';
import { BottomNavigation } from './components/navigation/BottomNavigation';
import { HomeView } from './features/home/HomeView';
import { WorkoutView } from './features/workouts/WorkoutView';
import { HistoryView } from './features/history/HistoryView';
import { ProgressView } from './features/progress/ProgressView';
import { SettingsView } from './features/settings/SettingsView';
import { useWorkoutStore } from './store/useWorkoutStore';

export function App() {
  const {
    activeTab,
    setActiveTab,
    userProfile,
    activeSession,
    completedSessions,
    elapsedSeconds,
    startWorkout,
    updateSet,
    toggleSetComplete,
    addSetToExercise,
    finishWorkout,
    cancelWorkout,
  } = useWorkoutStore();

  return (
    <AppShell>
      {/* Sticky Header with COOLIFT Logo */}
      <Header user={userProfile} />

      {/* Main Feature View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            user={userProfile}
            activeSession={activeSession}
            completedSessions={completedSessions}
            onStartWorkout={startWorkout}
            onResumeWorkout={() => setActiveTab('workout')}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutView
            activeSession={activeSession}
            elapsedSeconds={elapsedSeconds}
            onUpdateSet={updateSet}
            onToggleSetComplete={toggleSetComplete}
            onAddSet={addSetToExercise}
            onFinishWorkout={finishWorkout}
            onCancelWorkout={cancelWorkout}
            onStartNewWorkout={startWorkout}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            completedSessions={completedSessions}
            onStartNewWorkout={startWorkout}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView user={userProfile} />
        )}

        {activeTab === 'settings' && (
          <SettingsView user={userProfile} />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasActiveWorkout={Boolean(activeSession)}
      />
    </AppShell>
  );
}

export default App;
