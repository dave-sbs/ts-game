import chalk from 'chalk';
import { loadProgress, saveProgress } from '../lib/progress';
import { loadExercise, scaffoldExercise, getNextExercise, getAllExercises } from '../lib/exercises';

export async function startCommand(exerciseId?: string): Promise<void> {
  const progress = loadProgress();
  const completedExercises = progress.exerciseHistory.map(e => e.exerciseId);

  // If no exercise specified, find the next one
  if (!exerciseId) {
    // Find the first in-progress zone
    const inProgressZone = Object.entries(progress.zones)
      .find(([_, z]) => z.status === 'in-progress');
    
    if (!inProgressZone) {
      console.log(chalk.yellow('No zones in progress. Starting with foundations...'));
      exerciseId = getNextExercise('basic-annotations', completedExercises) || undefined;
    } else {
      // Find next exercise in the zone's topics
      const zoneId = inProgressZone[0];
      const topicOrder: Record<string, string[]> = {
        'foundations': ['basic-annotations', 'object-literals', 'type-aliases', 'arrays-tuples', 'typing-functions']
      };
      
      const topics = topicOrder[zoneId] || ['basic-annotations'];
      for (const topic of topics) {
        const next = getNextExercise(topic, completedExercises);
        if (next) {
          exerciseId = next;
          break;
        }
      }
    }
  }

  if (!exerciseId) {
    console.log(chalk.green('🎉 Congratulations! You have completed all available exercises!'));
    return;
  }

  // Check if there's already a current exercise
  if (progress.currentExercise && progress.currentExercise !== exerciseId) {
    console.log(chalk.yellow(`⚠️  You have an unfinished exercise: ${progress.currentExercise}`));
    console.log(chalk.gray('   Run `ts-quest check` to complete it or `ts-quest skip` to skip it.'));
    console.log();
  }

  // Load the exercise
  const exercise = loadExercise(exerciseId);
  if (!exercise) {
    console.log(chalk.red(`Exercise "${exerciseId}" not found.`));
    console.log(chalk.gray('Run `ts-quest topics` to see available exercises.'));
    return;
  }

  // Check if already completed
  if (completedExercises.includes(exerciseId)) {
    console.log(chalk.yellow(`Exercise "${exerciseId}" already completed!`));
    console.log(chalk.gray('Starting anyway for practice...'));
    console.log();
  }

  // Scaffold the exercise
  console.log(chalk.cyan('📦 Setting up exercise...'));
  const workDir = scaffoldExercise(exerciseId);

  // Update current exercise in progress
  progress.currentExercise = exerciseId;
  (progress as any).currentExerciseStartTime = Date.now();
  saveProgress(progress);

  // Display exercise info
  console.log();
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log(chalk.bold.yellow(`  📝 ${exercise.title}`));
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log();
  console.log(chalk.white(`  ${exercise.description}`));
  console.log();
  console.log(chalk.gray(`  Zone: ${exercise.zone}`));
  console.log(chalk.gray(`  Topic: ${exercise.topic}`));
  console.log(chalk.gray(`  Difficulty: ${'⭐'.repeat(exercise.difficulty)}`));
  console.log();
  console.log(chalk.cyan(`  💰 Base XP: ${exercise.xpBase}`));
  if (exercise.xpBonus.noHints > 0) {
    console.log(chalk.green(`     + ${exercise.xpBonus.noHints} XP for no hints`));
  }
  if (exercise.xpBonus.fastCompletion > 0) {
    console.log(chalk.green(`     + ${exercise.xpBonus.fastCompletion} XP for fast completion (< ${Math.floor(exercise.timeLimit / 60)} min)`));
  }
  console.log();
  console.log(chalk.bold.white('  FILES'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log(chalk.white(`  📂 ${workDir}`));
  console.log(chalk.white(`     └── exercise.ts   ${chalk.gray('← Edit this file')}`));
  console.log(chalk.white(`     └── test.ts       ${chalk.gray('← Tests to pass')}`));
  console.log();
  console.log(chalk.bold.white('  NEXT STEPS'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log(chalk.cyan('  1. Open exercise.ts in your editor'));
  console.log(chalk.cyan('  2. Add the required type annotations'));
  console.log(chalk.cyan('  3. Run `ts-quest check` to validate your solution'));
  console.log();
  console.log(chalk.gray('  Need help? Run `ts-quest hint`'));
  console.log();
}
