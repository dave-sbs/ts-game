import chalk from 'chalk';
import figlet from 'figlet';
import { loadProgress, updateStreak, saveProgress } from '../lib/progress';
import { getLevelTitle, getXPBar, formatXP } from '../lib/xp';

export async function statusCommand(): Promise<void> {
  let progress = loadProgress();
  progress = updateStreak(progress);
  saveProgress(progress);

  const { profile, zones, achievements } = progress;

  // ASCII Art Header
  console.log(chalk.cyan(figlet.textSync('TS Quest', { horizontalLayout: 'full' })));
  console.log();

  // Profile Section
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log(chalk.bold.yellow(`  ${getLevelTitle(profile.level)}`));
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log();

  // Level and XP
  const xpBar = getXPBar(profile.xp, profile.xpToNextLevel, 30);
  console.log(chalk.white(`  Level ${chalk.bold.cyan(profile.level)}`));
  console.log(chalk.white(`  ${chalk.green(xpBar)} ${formatXP(profile.xp)}/${formatXP(profile.xpToNextLevel)} XP`));
  console.log();

  // Streak
  const streakEmoji = profile.currentStreak >= 7 ? '🔥' : profile.currentStreak >= 3 ? '⚡' : '✨';
  console.log(chalk.white(`  ${streakEmoji} Current Streak: ${chalk.bold.yellow(profile.currentStreak)} days`));
  console.log(chalk.gray(`     Longest: ${profile.longestStreak} days`));
  console.log();

  // Zones Progress
  console.log(chalk.bold.white('  ZONES'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  
  const zoneNames: Record<string, string> = {
    'foundations': 'Foundations',
    'unions-narrowing': 'Unions & Narrowing',
    'objects': 'Objects',
    'mutability': 'Mutability',
    'classes': 'Classes',
    'ts-features': 'TS Features',
    'deriving-types': 'Deriving Types',
    'assertions': 'Assertions',
    'weird-parts': 'Weird Parts',
    'modules': 'Modules',
    'type-design': 'Type Design',
    'utility-patterns': 'Utility Patterns'
  };

  for (const [zoneId, zoneProgress] of Object.entries(zones)) {
    const name = zoneNames[zoneId] || zoneId;
    let statusIcon: string;
    let statusColor: (text: string) => string;
    
    switch (zoneProgress.status) {
      case 'completed':
        statusIcon = '✓';
        statusColor = chalk.green;
        break;
      case 'in-progress':
        statusIcon = '▶';
        statusColor = chalk.yellow;
        break;
      default:
        statusIcon = '🔒';
        statusColor = chalk.gray;
    }
    
    const progressBar = getXPBar(zoneProgress.progress, 100, 15);
    console.log(statusColor(`  ${statusIcon} ${name.padEnd(20)} ${progressBar} ${zoneProgress.progress}%`));
  }
  console.log();

  // Achievements
  console.log(chalk.bold.white('  ACHIEVEMENTS'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  if (achievements.length === 0) {
    console.log(chalk.gray('  No achievements yet. Complete exercises to earn badges!'));
  } else {
    console.log(chalk.white(`  🏆 ${achievements.length} unlocked`));
    for (const achievement of achievements.slice(0, 5)) {
      console.log(chalk.yellow(`     • ${achievement}`));
    }
    if (achievements.length > 5) {
      console.log(chalk.gray(`     ... and ${achievements.length - 5} more`));
    }
  }
  console.log();

  // Quick Actions
  console.log(chalk.bold.white('  QUICK ACTIONS'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log(chalk.cyan('  ts-quest start    ') + chalk.gray('Start next exercise'));
  console.log(chalk.cyan('  ts-quest topics   ') + chalk.gray('View all topics'));
  console.log(chalk.cyan('  ts-quest web      ') + chalk.gray('Open web dashboard'));
  console.log();
}
