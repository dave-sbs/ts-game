import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync, readdirSync, unlinkSync, rmSync, statSync } from 'fs';
import { join, dirname } from 'path';
import type { Exercise, ZonesConfig, Topic } from '../types';
import { getContentPath, getExercisesWorkDir } from './paths';

export function loadZonesConfig(): ZonesConfig {
  const contentPath = getContentPath();
  const zonesPath = join(contentPath, 'zones.json');
  
  if (!existsSync(zonesPath)) {
    throw new Error('zones.json not found at ' + zonesPath);
  }
  
  const content = readFileSync(zonesPath, 'utf-8');
  return JSON.parse(content) as ZonesConfig;
}

export function loadExercise(exerciseId: string): Exercise | null {
  const contentPath = getContentPath();
  
  // Find the exercise in the content directory
  const exercisesDir = join(contentPath, 'exercises');
  const topics = readdirSync(exercisesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  for (const topic of topics) {
    const topicDir = join(exercisesDir, topic);
    const exercises = readdirSync(topicDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
    
    for (const exercise of exercises) {
      const exerciseJsonPath = join(topicDir, exercise, 'exercise.json');
      if (existsSync(exerciseJsonPath)) {
        const content = readFileSync(exerciseJsonPath, 'utf-8');
        const exerciseData = JSON.parse(content) as Exercise;
        if (exerciseData.id === exerciseId) {
          return exerciseData;
        }
      }
    }
  }
  
  return null;
}

export function getExercisePath(exerciseId: string): string | null {
  const contentPath = getContentPath();
  const exercisesDir = join(contentPath, 'exercises');
  
  const topics = readdirSync(exercisesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  for (const topic of topics) {
    const topicDir = join(exercisesDir, topic);
    const exercises = readdirSync(topicDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
    
    for (const exercise of exercises) {
      const exerciseJsonPath = join(topicDir, exercise, 'exercise.json');
      if (existsSync(exerciseJsonPath)) {
        const content = readFileSync(exerciseJsonPath, 'utf-8');
        const exerciseData = JSON.parse(content) as Exercise;
        if (exerciseData.id === exerciseId) {
          return join(topicDir, exercise);
        }
      }
    }
  }
  
  return null;
}

export function scaffoldExercise(exerciseId: string): string {
  const exercisePath = getExercisePath(exerciseId);
  if (!exercisePath) {
    throw new Error(`Exercise ${exerciseId} not found`);
  }
  
  const workDir = getExercisesWorkDir();
  
  // Clear and recreate working directory
  if (existsSync(workDir)) {
    // Remove existing files
    const files = readdirSync(workDir);
    for (const file of files) {
      const filePath = join(workDir, file);
      try {
        if (statSync(filePath).isDirectory()) {
          rmSync(filePath, { recursive: true });
        } else {
          unlinkSync(filePath);
        }
      } catch {
        // Ignore errors
      }
    }
  } else {
    mkdirSync(workDir, { recursive: true });
  }
  
  // Copy starter file
  const starterPath = join(exercisePath, 'starter.ts');
  if (existsSync(starterPath)) {
    const starterContent = readFileSync(starterPath, 'utf-8');
    writeFileSync(join(workDir, 'exercise.ts'), starterContent);
  }
  
  // Copy test file
  const testPath = join(exercisePath, 'test.ts');
  if (existsSync(testPath)) {
    const testContent = readFileSync(testPath, 'utf-8');
    writeFileSync(join(workDir, 'test.ts'), testContent);
  }
  
  // Copy exercise.json for reference
  const exerciseJsonPath = join(exercisePath, 'exercise.json');
  if (existsSync(exerciseJsonPath)) {
    const exerciseJson = readFileSync(exerciseJsonPath, 'utf-8');
    writeFileSync(join(workDir, 'exercise.json'), exerciseJson);
  }
  
  return workDir;
}

export function getNextExercise(topicId: string, completedExercises: string[]): string | null {
  const contentPath = getContentPath();
  const topicDir = join(contentPath, 'exercises', topicId);
  
  if (!existsSync(topicDir)) {
    return null;
  }
  
  const exerciseDirs = readdirSync(topicDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();
  
  for (const exerciseDir of exerciseDirs) {
    const exerciseJsonPath = join(topicDir, exerciseDir, 'exercise.json');
    if (existsSync(exerciseJsonPath)) {
      const content = readFileSync(exerciseJsonPath, 'utf-8');
      const exercise = JSON.parse(content) as Exercise;
      if (!completedExercises.includes(exercise.id)) {
        return exercise.id;
      }
    }
  }
  
  return null;
}

export function getAllExercises(): Exercise[] {
  const contentPath = getContentPath();
  const exercisesDir = join(contentPath, 'exercises');
  const exercises: Exercise[] = [];
  
  if (!existsSync(exercisesDir)) {
    return exercises;
  }
  
  const topics = readdirSync(exercisesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  for (const topic of topics) {
    const topicDir = join(exercisesDir, topic);
    const exerciseDirs = readdirSync(topicDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort();
    
    for (const exerciseDir of exerciseDirs) {
      const exerciseJsonPath = join(topicDir, exerciseDir, 'exercise.json');
      if (existsSync(exerciseJsonPath)) {
        const content = readFileSync(exerciseJsonPath, 'utf-8');
        exercises.push(JSON.parse(content) as Exercise);
      }
    }
  }
  
  return exercises;
}

export function getCurrentWorkDir(): string {
  return getExercisesWorkDir();
}

export { getContentPath };
