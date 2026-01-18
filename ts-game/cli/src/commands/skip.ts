import chalk from 'chalk';
import { loadProgress, saveProgress } from '../lib/progress';
import { loadExercise } from '../lib/exercises';

export async function skipCommand(): Promise<void> {
  const progress = loadProgress();

  if (!progress.currentExercise) {
    console.log(chalk.yellow('No exercise in progress.'));
    console.log(chalk.gray('Run `ts-quest start` to begin an exercise.'));
    return;
  }

  const exerciseId = progress.currentExercise;
  const exercise = loadExercise(exerciseId);

  console.log(chalk.yellow(`⏭️  Skipping exercise: ${exercise?.title || exerciseId}`));
  console.log();

  // Clear current exercise
  progress.currentExercise = undefined;
  delete (progress as any).currentExerciseStartTime;
  delete (progress as any).currentExerciseHints;
  
  saveProgress(progress);

  console.log(chalk.gray('Exercise skipped. You can return to it later.'));
  console.log();
  console.log(chalk.cyan('ts-quest start    ') + chalk.gray('Continue to next exercise'));
  console.log(chalk.cyan(`ts-quest start ${exerciseId}  `) + chalk.gray('Retry this exercise'));
  console.log();
}
