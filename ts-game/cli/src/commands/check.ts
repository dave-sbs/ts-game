import chalk from 'chalk';
import { spawn } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { loadProgress, saveProgress, markExerciseComplete, unlockAchievement } from '../lib/progress';
import { loadExercise, getCurrentWorkDir } from '../lib/exercises';
import { calculateXP, getXPBar } from '../lib/xp';

function runTypeScript(filePath: string): Promise<{ success: boolean; output: string }> {
  return new Promise((resolve) => {
    const tsc = spawn('npx', ['tsc', '--noEmit', '--strict', filePath], {
      shell: true,
      cwd: getCurrentWorkDir()
    });

    let output = '';
    tsc.stdout.on('data', (data) => { output += data.toString(); });
    tsc.stderr.on('data', (data) => { output += data.toString(); });

    tsc.on('close', (code) => {
      resolve({ success: code === 0, output });
    });
  });
}

export async function checkCommand(): Promise<void> {
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

  const workDir = getCurrentWorkDir();
  const exerciseFile = join(workDir, 'exercise.ts');

  if (!existsSync(exerciseFile)) {
    console.log(chalk.red('exercise.ts not found in working directory.'));
    console.log(chalk.gray(`Expected at: ${exerciseFile}`));
    return;
  }

  console.log(chalk.cyan('🔍 Checking your solution...'));
  console.log();

  // Run TypeScript compiler
  const result = await runTypeScript(exerciseFile);

  if (!result.success) {
    console.log(chalk.red('❌ TypeScript errors found:'));
    console.log();
    console.log(chalk.gray(result.output));
    console.log();
    console.log(chalk.yellow('💡 Tip: Run `ts-quest hint` for help'));
    return;
  }

  // Calculate time spent
  const startTime = (progress as any).currentExerciseStartTime || Date.now();
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  const hintsUsed = (progress as any).currentExerciseHints || 0;

  // Calculate XP
  const xpCalc = calculateXP(exercise, hintsUsed, timeSpent, progress.profile.currentStreak);

  console.log(chalk.green('✅ Success! All type checks passed!'));
  console.log();
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log(chalk.bold.yellow('  🎉 EXERCISE COMPLETE!'));
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log();

  // XP Breakdown
  console.log(chalk.bold.white('  XP EARNED'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log(chalk.white(`  Base XP:           ${chalk.cyan('+' + xpCalc.base)}`));
  if (xpCalc.noHintsBonus > 0) {
    console.log(chalk.green(`  No hints bonus:    +${xpCalc.noHintsBonus}`));
  }
  if (xpCalc.speedBonus > 0) {
    console.log(chalk.green(`  Speed bonus:       +${xpCalc.speedBonus}`));
  }
  if (xpCalc.streakBonus > 0) {
    console.log(chalk.yellow(`  Streak bonus:      +${xpCalc.streakBonus}`));
  }
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log(chalk.bold.cyan(`  TOTAL:             +${xpCalc.total} XP`));
  console.log();

  // Time taken
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  console.log(chalk.gray(`  ⏱️  Time: ${minutes}m ${seconds}s`));
  console.log();

  // Update progress
  let updatedProgress = markExerciseComplete(progress, exerciseId, xpCalc.total, hintsUsed, timeSpent);

  // Check for achievements
  const exerciseCount = updatedProgress.exerciseHistory.length;
  if (exerciseCount === 1) {
    updatedProgress = unlockAchievement(updatedProgress, 'first-exercise');
    console.log(chalk.yellow('  🏆 Achievement Unlocked: First Exercise!'));
  }
  if (exerciseCount === 10) {
    updatedProgress = unlockAchievement(updatedProgress, 'ten-exercises');
    console.log(chalk.yellow('  🏆 Achievement Unlocked: Ten Down!'));
  }
  if (updatedProgress.profile.currentStreak >= 3 && !updatedProgress.achievements.includes('streak-3')) {
    updatedProgress = unlockAchievement(updatedProgress, 'streak-3');
    console.log(chalk.yellow('  🏆 Achievement Unlocked: On Fire! (3 day streak)'));
  }
  if (hintsUsed === 0 && !updatedProgress.achievements.includes('no-hints')) {
    updatedProgress = unlockAchievement(updatedProgress, 'no-hints');
    console.log(chalk.yellow('  🏆 Achievement Unlocked: Self Sufficient!'));
  }

  // Clean up temp fields
  delete (updatedProgress as any).currentExerciseStartTime;
  delete (updatedProgress as any).currentExerciseHints;

  saveProgress(updatedProgress);

  // Show level progress
  console.log();
  console.log(chalk.bold.white('  LEVEL PROGRESS'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  const xpBar = getXPBar(updatedProgress.profile.xp, updatedProgress.profile.xpToNextLevel, 30);
  console.log(chalk.white(`  Level ${updatedProgress.profile.level}: ${chalk.green(xpBar)} ${updatedProgress.profile.xp}/${updatedProgress.profile.xpToNextLevel} XP`));
  console.log();

  // Next steps
  console.log(chalk.bold.white('  NEXT'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log(chalk.cyan('  ts-quest start    ') + chalk.gray('Continue to next exercise'));
  console.log(chalk.cyan('  ts-quest status   ') + chalk.gray('View your progress'));
  console.log();
}
