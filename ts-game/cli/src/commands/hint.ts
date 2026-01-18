import chalk from 'chalk';
import { loadProgress, saveProgress } from '../lib/progress';
import { loadExercise } from '../lib/exercises';

export async function hintCommand(): Promise<void> {
  const progress = loadProgress();

  if (!progress.currentExercise) {
    console.log(chalk.yellow('No exercise in progress.'));
    console.log(chalk.gray('Run `ts-quest start` to begin an exercise.'));
    return;
  }

  const exerciseId = progress.currentExercise;
  const exercise = loadExercise(exerciseId);

  if (!exercise) {
    console.log(chalk.red(`Exercise "${exerciseId}" not found.`));
    return;
  }

  const hintsUsed = (progress as any).currentExerciseHints || 0;
  const totalHints = exercise.hints.length;

  if (hintsUsed >= totalHints) {
    console.log(chalk.yellow('💡 You have used all available hints for this exercise.'));
    console.log();
    console.log(chalk.gray('Hints used:'));
    exercise.hints.forEach((hint, i) => {
      console.log(chalk.white(`  ${i + 1}. ${hint}`));
    });
    return;
  }

  // Show warning about XP loss
  if (hintsUsed === 0) {
    console.log(chalk.yellow(`⚠️  Using a hint will forfeit the "no hints" bonus (${exercise.xpBonus.noHints} XP)`));
    console.log();
  }

  // Reveal next hint
  const hintNumber = hintsUsed + 1;
  const hint = exercise.hints[hintsUsed];

  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log(chalk.bold.yellow(`  💡 HINT ${hintNumber}/${totalHints}`));
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log();
  console.log(chalk.white(`  ${hint}`));
  console.log();

  // Update hints used
  (progress as any).currentExerciseHints = hintNumber;
  saveProgress(progress);

  if (hintNumber < totalHints) {
    console.log(chalk.gray(`  Run \`ts-quest hint\` again for more hints (${totalHints - hintNumber} remaining)`));
  } else {
    console.log(chalk.gray('  No more hints available'));
  }
  console.log();
}
