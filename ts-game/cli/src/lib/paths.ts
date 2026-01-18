import { existsSync } from 'fs';
import { join, dirname } from 'path';

// Get the directory of the CLI package
function getCliRoot(): string {
  // When running from dist, we're in dist/lib
  // __dirname equivalent for CommonJS
  let dir = __dirname;
  
  // Navigate up to find the cli root (where package.json is)
  while (dir !== '/' && !existsSync(join(dir, 'package.json'))) {
    dir = dirname(dir);
  }
  
  return dir;
}

export function getContentPath(): string {
  const cliRoot = getCliRoot();
  
  // Try relative to the CLI package
  let contentPath = join(cliRoot, '..', 'content');
  if (existsSync(contentPath)) {
    return contentPath;
  }
  
  // Fallback - try a few more levels up
  contentPath = join(cliRoot, '..', '..', 'content');
  if (existsSync(contentPath)) {
    return contentPath;
  }
  
  // Development fallback
  contentPath = join(process.cwd(), 'content');
  if (existsSync(contentPath)) {
    return contentPath;
  }
  
  throw new Error('Could not find content directory');
}

export function getExercisesWorkDir(): string {
  const cliRoot = getCliRoot();
  
  // Try relative to the CLI package
  let exercisesPath = join(cliRoot, '..', 'exercises', 'current');
  if (existsSync(dirname(exercisesPath))) {
    return exercisesPath;
  }
  
  // Fallback
  exercisesPath = join(cliRoot, '..', '..', 'exercises', 'current');
  if (existsSync(dirname(exercisesPath))) {
    return exercisesPath;
  }
  
  // Development fallback
  return join(process.cwd(), 'exercises', 'current');
}

export function getWebDir(): string {
  const cliRoot = getCliRoot();
  
  // Try relative to the CLI package
  let webDir = join(cliRoot, '..', 'web');
  if (existsSync(webDir)) {
    return webDir;
  }
  
  // Fallback
  webDir = join(cliRoot, '..', '..', 'web');
  if (existsSync(webDir)) {
    return webDir;
  }
  
  // Development fallback
  return join(process.cwd(), 'web');
}
