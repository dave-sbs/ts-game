import type { Exercise, Progress } from '../types';

export interface XPCalculation {
  base: number;
  noHintsBonus: number;
  speedBonus: number;
  streakBonus: number;
  total: number;
}

export function calculateXP(
  exercise: Exercise,
  hintsUsed: number,
  timeSpent: number,
  currentStreak: number
): XPCalculation {
  const base = exercise.xpBase;
  
  // No hints bonus - only if no hints were used
  const noHintsBonus = hintsUsed === 0 ? exercise.xpBonus.noHints : 0;
  
  // Speed bonus - if completed within time limit
  const speedBonus = timeSpent < exercise.timeLimit ? exercise.xpBonus.fastCompletion : 0;
  
  // Streak bonus - 5% per day of streak, max 50%
  const streakMultiplier = Math.min(currentStreak * 0.05, 0.5);
  const baseTotal = base + noHintsBonus + speedBonus;
  const streakBonus = Math.floor(baseTotal * streakMultiplier);
  
  return {
    base,
    noHintsBonus,
    speedBonus,
    streakBonus,
    total: baseTotal + streakBonus
  };
}

export function getLevelTitle(level: number): string {
  const titles = [
    'TypeScript Apprentice',      // 1
    'Code Initiate',              // 2
    'Type Novice',                // 3
    'Annotation Adept',           // 4
    'Interface Journeyman',       // 5
    'Generic Explorer',           // 6
    'Union Master',               // 7
    'Narrowing Specialist',       // 8
    'Type Guard Champion',        // 9
    'Utility Wizard',             // 10
    'Declaration Sage',           // 11
    'TypeScript Architect',       // 12
    'Type System Oracle',         // 13
    'Inference Grandmaster',      // 14
    'TypeScript Legend'           // 15+
  ];
  
  return titles[Math.min(level - 1, titles.length - 1)];
}

export function getXPBar(current: number, max: number, width: number = 20): string {
  const filled = Math.floor((current / max) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}
