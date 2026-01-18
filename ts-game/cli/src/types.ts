// Progress and Profile Types
export interface Profile {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface ZoneProgress {
  status: 'locked' | 'in-progress' | 'completed';
  progress: number;
}

export interface TopicProgress {
  completed: boolean;
  xpEarned: number;
  exercisesCompleted: number;
  exercisesTotal: number;
}

export interface ExerciseHistoryEntry {
  exerciseId: string;
  completedAt: string;
  xpEarned: number;
  hintsUsed: number;
  timeSpent: number;
}

export interface Progress {
  profile: Profile;
  zones: Record<string, ZoneProgress>;
  topics: Record<string, TopicProgress>;
  achievements: string[];
  exerciseHistory: ExerciseHistoryEntry[];
  currentExercise?: string;
}

// Zone and Topic Types
export interface Zone {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: string[];
  prerequisites: string[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  zone: string;
  exercises: string[];
  lessonFile: string;
  quizFile: string;
}

export interface ZonesConfig {
  zones: Zone[];
  topics: Topic[];
}

// Exercise Types
export interface ExerciseXPBonus {
  noHints: number;
  fastCompletion: number;
}

export interface Exercise {
  id: string;
  title: string;
  topic: string;
  zone: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  xpBase: number;
  xpBonus: ExerciseXPBonus;
  description: string;
  hints: string[];
  timeLimit: number;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'type-matching';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  xp: number;
}

export interface Quiz {
  id: string;
  topic: string;
  title: string;
  questions: QuizQuestion[];
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp: number;
  condition: string;
}

// Config Types
export interface Config {
  progressPath: string;
  contentPath: string;
  exercisesPath: string;
  webPort: number;
}
