// Types matching CLI types
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

// Demo progress for web dashboard
export function getDefaultProgress(): Progress {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    profile: {
      name: 'TypeScript Apprentice',
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: today
    },
    zones: {
      'foundations': { status: 'in-progress', progress: 0 },
      'unions-narrowing': { status: 'locked', progress: 0 },
      'objects': { status: 'locked', progress: 0 },
      'mutability': { status: 'locked', progress: 0 },
      'classes': { status: 'locked', progress: 0 },
      'ts-features': { status: 'locked', progress: 0 },
      'deriving-types': { status: 'locked', progress: 0 },
      'assertions': { status: 'locked', progress: 0 },
      'weird-parts': { status: 'locked', progress: 0 },
      'modules': { status: 'locked', progress: 0 },
      'type-design': { status: 'locked', progress: 0 },
      'utility-patterns': { status: 'locked', progress: 0 }
    },
    topics: {
      'basic-annotations': { completed: false, xpEarned: 0, exercisesCompleted: 0, exercisesTotal: 5 },
      'object-literals': { completed: false, xpEarned: 0, exercisesCompleted: 0, exercisesTotal: 5 },
      'type-aliases': { completed: false, xpEarned: 0, exercisesCompleted: 0, exercisesTotal: 5 },
      'arrays-tuples': { completed: false, xpEarned: 0, exercisesCompleted: 0, exercisesTotal: 5 },
      'typing-functions': { completed: false, xpEarned: 0, exercisesCompleted: 0, exercisesTotal: 5 }
    },
    achievements: [],
    exerciseHistory: [],
    currentExercise: undefined
  };
}

// Load progress - in a real app this would read from file or API
export function loadProgress(): Progress {
  const stored = localStorage.getItem('ts-quest-progress');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getDefaultProgress();
    }
  }
  return getDefaultProgress();
}

// Save progress to localStorage
export function saveProgress(progress: Progress): void {
  localStorage.setItem('ts-quest-progress', JSON.stringify(progress));
}

// Utility functions
export function getLevelTitle(level: number): string {
  const titles = [
    'TypeScript Apprentice',
    'Code Initiate',
    'Type Novice',
    'Annotation Adept',
    'Interface Journeyman',
    'Generic Explorer',
    'Union Master',
    'Narrowing Specialist',
    'Type Guard Champion',
    'Utility Wizard',
    'Declaration Sage',
    'TypeScript Architect',
    'Type System Oracle',
    'Inference Grandmaster',
    'TypeScript Legend'
  ];
  
  return titles[Math.min(level - 1, titles.length - 1)];
}

export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}
