import chalk from 'chalk';
import { loadProgress } from '../lib/progress';
import { loadZonesConfig, getAllExercises } from '../lib/exercises';

export async function topicsCommand(): Promise<void> {
  const progress = loadProgress();
  
  let zonesConfig;
  try {
    zonesConfig = loadZonesConfig();
  } catch {
    // Use fallback data if zones.json doesn't exist
    zonesConfig = {
      zones: [
        {
          id: 'foundations',
          name: 'Foundations',
          description: 'Basic TypeScript types and annotations',
          topics: ['basic-annotations', 'object-literals', 'type-aliases', 'arrays-tuples', 'typing-functions']
        }
      ],
      topics: [
        { id: 'basic-annotations', name: 'Basic Annotations', zone: 'foundations' },
        { id: 'object-literals', name: 'Object Literals', zone: 'foundations' },
        { id: 'type-aliases', name: 'Type Aliases', zone: 'foundations' },
        { id: 'arrays-tuples', name: 'Arrays & Tuples', zone: 'foundations' },
        { id: 'typing-functions', name: 'Typing Functions', zone: 'foundations' }
      ]
    };
  }

  const exercises = getAllExercises();
  const completedExercises = progress.exerciseHistory.map(e => e.exerciseId);

  console.log();
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log(chalk.bold.yellow('  📚 TOPICS'));
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log();

  for (const zone of zonesConfig.zones) {
    const zoneProgress = progress.zones[zone.id];
    const zoneStatus = zoneProgress?.status || 'locked';
    
    let zoneIcon: string;
    let zoneColor: (text: string) => string;
    
    switch (zoneStatus) {
      case 'completed':
        zoneIcon = '✓';
        zoneColor = chalk.green;
        break;
      case 'in-progress':
        zoneIcon = '▶';
        zoneColor = chalk.yellow;
        break;
      default:
        zoneIcon = '🔒';
        zoneColor = chalk.gray;
    }

    console.log(zoneColor(`  ${zoneIcon} ${zone.name.toUpperCase()}`));
    console.log(chalk.gray(`     ${zone.description || ''}`));
    console.log();

    // Show topics in this zone
    const zoneTopics = zonesConfig.topics.filter(t => t.zone === zone.id);
    
    for (const topic of zoneTopics) {
      const topicProgress = progress.topics[topic.id];
      const topicExercises = exercises.filter(e => e.topic === topic.id);
      const completedCount = topicExercises.filter(e => completedExercises.includes(e.id)).length;
      const totalCount = topicExercises.length || topicProgress?.exercisesTotal || 0;

      let topicIcon: string;
      let topicColor: (text: string) => string;

      if (topicProgress?.completed) {
        topicIcon = '✓';
        topicColor = chalk.green;
      } else if (completedCount > 0) {
        topicIcon = '◐';
        topicColor = chalk.yellow;
      } else if (zoneStatus === 'locked') {
        topicIcon = '○';
        topicColor = chalk.gray;
      } else {
        topicIcon = '○';
        topicColor = chalk.white;
      }

      const progressText = totalCount > 0 ? `${completedCount}/${totalCount}` : '';
      console.log(topicColor(`     ${topicIcon} ${topic.name.padEnd(25)} ${progressText}`));

      // Show exercises if topic is in progress or unlocked
      if (zoneStatus !== 'locked' && topicExercises.length > 0) {
        for (const exercise of topicExercises) {
          const isComplete = completedExercises.includes(exercise.id);
          const exerciseIcon = isComplete ? '✓' : '○';
          const exerciseColor = isComplete ? chalk.green : chalk.gray;
          console.log(exerciseColor(`       ${exerciseIcon} ${exercise.id}: ${exercise.title}`));
        }
      }
    }
    console.log();
  }

  // Quick actions
  console.log(chalk.bold.white('  ACTIONS'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  console.log(chalk.cyan('  ts-quest start              ') + chalk.gray('Start next exercise'));
  console.log(chalk.cyan('  ts-quest start <exercise>   ') + chalk.gray('Start specific exercise'));
  console.log();
}
