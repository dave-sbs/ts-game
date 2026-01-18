import chalk from 'chalk';
import { loadProgress } from '../lib/progress';

export async function zonesCommand(): Promise<void> {
  const progress = loadProgress();

  console.log();
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log(chalk.bold.yellow('  🗺️  SKILL TREE'));
  console.log(chalk.bold.white('═══════════════════════════════════════════════════════════'));
  console.log();

  // ASCII Skill Tree
  const zones = [
    { id: 'foundations', name: 'Foundations', row: 0, col: 1 },
    { id: 'unions-narrowing', name: 'Unions & Narrowing', row: 1, col: 0 },
    { id: 'objects', name: 'Objects', row: 1, col: 2 },
    { id: 'mutability', name: 'Mutability', row: 2, col: 0 },
    { id: 'classes', name: 'Classes', row: 2, col: 2 },
    { id: 'ts-features', name: 'TS Features', row: 3, col: 1 },
    { id: 'deriving-types', name: 'Deriving Types', row: 4, col: 0 },
    { id: 'assertions', name: 'Assertions', row: 4, col: 2 },
    { id: 'weird-parts', name: 'Weird Parts', row: 5, col: 1 },
    { id: 'modules', name: 'Modules', row: 6, col: 0 },
    { id: 'type-design', name: 'Type Design', row: 6, col: 2 },
    { id: 'utility-patterns', name: 'Utility Patterns', row: 7, col: 1 }
  ];

  // Group zones by row
  const rows: Map<number, typeof zones> = new Map();
  for (const zone of zones) {
    if (!rows.has(zone.row)) {
      rows.set(zone.row, []);
    }
    rows.get(zone.row)!.push(zone);
  }

  // Render each row
  for (let row = 0; row <= 7; row++) {
    const rowZones = rows.get(row) || [];
    let line = '  ';
    
    // Sort by column
    rowZones.sort((a, b) => a.col - b.col);
    
    for (const zone of rowZones) {
      const zoneProgress = progress.zones[zone.id];
      const status = zoneProgress?.status || 'locked';
      const progressPct = zoneProgress?.progress || 0;

      let icon: string;
      let color: (text: string) => string;

      switch (status) {
        case 'completed':
          icon = '◆';
          color = chalk.green;
          break;
        case 'in-progress':
          icon = '◇';
          color = chalk.yellow;
          break;
        default:
          icon = '○';
          color = chalk.gray;
      }

      const displayName = zone.name.length > 18 ? zone.name.substring(0, 15) + '...' : zone.name;
      const paddedName = displayName.padEnd(18);
      
      // Add spacing based on column
      if (zone.col === 0) {
        line = '  ' + color(`${icon} ${paddedName}`);
      } else if (zone.col === 1) {
        line = '                  ' + color(`${icon} ${paddedName}`);
      } else {
        line += '     ' + color(`${icon} ${paddedName}`);
      }
    }
    
    console.log(line);

    // Draw connectors between rows
    if (row < 7) {
      const nextRow = rows.get(row + 1) || [];
      if (nextRow.length > 0) {
        let connector = '                       ';
        if (row === 0) {
          connector = '              ┌────────┴────────┐';
        } else if (row === 2 || row === 4) {
          connector = '                      │';
        } else if (row === 1 || row === 3) {
          connector = '              └────────┬────────┘';
        } else if (row === 5) {
          connector = '              ┌────────┴────────┐';
        } else if (row === 6) {
          connector = '              └────────┬────────┘';
        }
        console.log(chalk.gray(connector));
      }
    }
  }

  console.log();
  console.log(chalk.gray('  Legend: ◆ Complete  ◇ In Progress  ○ Locked'));
  console.log();

  // Zone details
  console.log(chalk.bold.white('  ZONE DETAILS'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));

  for (const zone of zones) {
    const zoneProgress = progress.zones[zone.id];
    const status = zoneProgress?.status || 'locked';
    const progressPct = zoneProgress?.progress || 0;

    let statusText: string;
    let color: (text: string) => string;

    switch (status) {
      case 'completed':
        statusText = 'Complete';
        color = chalk.green;
        break;
      case 'in-progress':
        statusText = `${progressPct}%`;
        color = chalk.yellow;
        break;
      default:
        statusText = 'Locked';
        color = chalk.gray;
    }

    console.log(color(`  ${zone.name.padEnd(22)} ${statusText}`));
  }

  console.log();
}
