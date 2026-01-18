import chalk from 'chalk';
import open from 'open';
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { getWebDir } from '../lib/paths';

export async function webCommand(): Promise<void> {
  console.log(chalk.cyan('🌐 Opening TypeScript Quest web dashboard...'));
  console.log();

  // Find the web directory
  const webDir = getWebDir();

  if (!existsSync(webDir)) {
    console.log(chalk.yellow('Web dashboard not found.'));
    console.log(chalk.gray('The web dashboard is optional. Your progress is being tracked!'));
    console.log();
    console.log(chalk.gray('To set up the web dashboard:'));
    console.log(chalk.cyan('  cd web && npm install && npm run dev'));
    return;
  }

  // Check if node_modules exists
  const nodeModulesDir = join(webDir, 'node_modules');
  if (!existsSync(nodeModulesDir)) {
    console.log(chalk.yellow('Web dependencies not installed.'));
    console.log(chalk.gray('Run the following to set up:'));
    console.log(chalk.cyan(`  cd ${webDir} && npm install && npm run dev`));
    return;
  }

  // For now, just provide instructions
  console.log(chalk.white('To start the web dashboard:'));
  console.log();
  console.log(chalk.cyan(`  cd ${webDir}`));
  console.log(chalk.cyan('  npm run dev'));
  console.log();
  console.log(chalk.gray('Then open http://localhost:5173 in your browser'));
  console.log();
}
