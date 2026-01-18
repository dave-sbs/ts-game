import { homedir } from 'os';
import { join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import type { Progress, Profile, ZoneProgress, TopicProgress, ExerciseHistoryEntry } from '../types';

const TS_QUEST_DIR = join(homedir(), '.ts-quest');
const PROGRESS_FILE = join(TS_QUEST_DIR, 'progress.json');

function getDefaultProgress(): Progress {
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

export function ensureProgressDir(): void {
  if (!existsSync(TS_QUEST_DIR)) {
    mkdirSync(TS_QUEST_DIR, { recursive: true });
  }
}

export function loadProgress(): Progress {
  ensureProgressDir();
  
  if (!existsSync(PROGRESS_FILE)) {
    const defaultProgress = getDefaultProgress();
    saveProgress(defaultProgress);
    return defaultProgress;
  }
  
  try {
    const content = readFileSync(PROGRESS_FILE, 'utf-8');
    return JSON.parse(content) as Progress;
  } catch {
    const defaultProgress = getDefaultProgress();
    saveProgress(defaultProgress);
    return defaultProgress;
  }
}

export function saveProgress(progress: Progress): void {
  ensureProgressDir();
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

export function updateStreak(progress: Progress): Progress {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = progress.profile.lastActiveDate;
  
  if (lastActive === today) {
    return progress;
  }
  
  const lastDate = new Date(lastActive);
  const todayDate = new Date(today);
  const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    progress.profile.currentStreak += 1;
    if (progress.profile.currentStreak > progress.profile.longestStreak) {
      progress.profile.longestStreak = progress.profile.currentStreak;
    }
  } else if (diffDays > 1) {
    progress.profile.currentStreak = 1;
  }
  
  progress.profile.lastActiveDate = today;
  return progress;
}

export function addXP(progress: Progress, xp: number): Progress {
  progress.profile.xp += xp;
  
  while (progress.profile.xp >= progress.profile.xpToNextLevel) {
    progress.profile.xp -= progress.profile.xpToNextLevel;
    progress.profile.level += 1;
    progress.profile.xpToNextLevel = calculateXPForLevel(progress.profile.level);
  }
  
  return progress;
}

function calculateXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.2, level - 1));
}

export function markExerciseComplete(
  progress: Progress,
  exerciseId: string,
  xpEarned: number,
  hintsUsed: number,
  timeSpent: number
): Progress {
  const entry: ExerciseHistoryEntry = {
    exerciseId,
    completedAt: new Date().toISOString(),
    xpEarned,
    hintsUsed,
    timeSpent
  };
  
  progress.exerciseHistory.push(entry);
  progress.currentExercise = undefined;
  
  return addXP(progress, xpEarned);
}

export function unlockAchievement(progress: Progress, achievementId: string): Progress {
  if (!progress.achievements.includes(achievementId)) {
    progress.achievements.push(achievementId);
  }
  return progress;
}

export function updateZoneProgress(progress: Progress, zoneId: string): Progress {
  const zone = progress.zones[zoneId];
  if (!zone) return progress;
  
  // Calculate zone progress based on topics
  // This would need to be connected to the zones.json config
  return progress;
}

export function getProgressPath(): string {
  return PROGRESS_FILE;
}

export function getTsQuestDir(): string {
  return TS_QUEST_DIR;
}
