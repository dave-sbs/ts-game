#!/usr/bin/env node

import { Command } from 'commander';
import { statusCommand } from './commands/status';
import { startCommand } from './commands/start';
import { checkCommand } from './commands/check';
import { hintCommand } from './commands/hint';
import { topicsCommand } from './commands/topics';
import { zonesCommand } from './commands/zones';
import { webCommand } from './commands/web';
import { skipCommand } from './commands/skip';

const program = new Command();

program
  .name('ts-quest')
  .description('TypeScript Quest - A gamified TypeScript learning experience')
  .version('1.0.0');

program
  .command('status')
  .description('Show your current progress, XP, level, and streak')
  .action(statusCommand);

program
  .command('start [exercise]')
  .description('Start an exercise (next recommended or specific exercise ID)')
  .action(startCommand);

program
  .command('check')
  .description('Validate your current exercise solution')
  .action(checkCommand);

program
  .command('hint')
  .description('Get a hint for the current exercise (costs potential XP)')
  .action(hintCommand);

program
  .command('skip')
  .description('Skip the current exercise')
  .action(skipCommand);

program
  .command('topics')
  .description('List all topics and their completion status')
  .action(topicsCommand);

program
  .command('zones')
  .description('Show zone overview with skill tree visualization')
  .action(zonesCommand);

program
  .command('web')
  .description('Open the web dashboard in your browser')
  .action(webCommand);

// Default to status if no command provided
if (process.argv.length <= 2) {
  statusCommand();
} else {
  program.parse();
}
