# TypeScript Quest

A gamified TypeScript learning experience with CLI exercises and a web dashboard.

## Quick Start

### 1. Install the CLI

```bash
cd cli
npm install
npm run build
npm link  # Makes `ts-quest` available globally
```

### 2. Start Learning

```bash
# Show your progress
ts-quest status

# Start an exercise
ts-quest start

# Check your solution
ts-quest check

# Get a hint
ts-quest hint
```

### 3. Optional: Web Dashboard

```bash
cd web
npm install
npm run dev
# Open http://localhost:5173
```

## Project Structure

```
ts-game/
├── cli/                          # CLI tool
│   ├── src/
│   │   ├── index.ts              # Entry point
│   │   ├── commands/             # Command handlers
│   │   └── lib/                  # Utilities
│   └── package.json
│
├── web/                          # Web dashboard
│   ├── src/
│   │   ├── pages/                # React pages
│   │   └── components/           # React components
│   └── package.json
│
├── content/                      # Learning content
│   ├── zones.json                # Zone definitions
│   ├── lessons/                  # Markdown lessons
│   ├── quizzes/                  # Quiz JSON files
│   └── exercises/                # Coding exercises
│
└── exercises/                    # User's working directory
    └── current/                  # Current exercise files
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `ts-quest status` | Show XP, level, streak, and progress |
| `ts-quest start [exercise]` | Start the next or a specific exercise |
| `ts-quest check` | Validate your current solution |
| `ts-quest hint` | Get a hint (costs potential XP) |
| `ts-quest skip` | Skip the current exercise |
| `ts-quest topics` | List all topics and exercises |
| `ts-quest zones` | Show skill tree visualization |
| `ts-quest web` | Open web dashboard |

## Progress System

Your progress is saved in `~/.ts-quest/progress.json`:

- **XP & Levels**: Earn XP by completing exercises
- **Streaks**: Daily practice bonus
- **Achievements**: Unlock badges for milestones
- **Zone Progress**: Track your journey through TypeScript concepts

## Exercise Flow

1. Run `ts-quest start` to scaffold an exercise
2. Open the exercise file in your editor
3. Add the required TypeScript annotations
4. Run `ts-quest check` to validate your solution
5. Earn XP and move to the next exercise!

## Zones

1. **Foundations** - Basic types and annotations
2. **Unions & Narrowing** - Union types and type guards
3. **Objects** - Object types and interfaces
4. **Mutability** - Readonly and const assertions
5. **Classes** - OOP with TypeScript
6. **TS Features** - Enums, namespaces
7. **Deriving Types** - keyof, typeof, utilities
8. **Assertions** - Type assertions, satisfies
9. **Weird Parts** - Edge cases and gotchas
10. **Modules** - Modules and declaration files
11. **Type Design** - Generics, mapped types
12. **Utility Patterns** - Advanced patterns

## Contributing

Add new exercises by creating folders in `content/exercises/`:

```
content/exercises/your-topic/
└── 01-exercise-name/
    ├── exercise.json    # Metadata, hints, XP
    ├── starter.ts       # Starting code
    ├── solution.ts      # Reference solution
    └── test.ts          # Validation tests
```

## License

MIT
