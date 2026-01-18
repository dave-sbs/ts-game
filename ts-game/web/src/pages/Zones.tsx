import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, PlayCircle, ChevronRight } from 'lucide-react';
import { loadProgress, type Progress } from '../lib/progress';

interface ZoneNode {
  id: string;
  name: string;
  description: string;
  row: number;
  col: number;
  color: string;
}

const zones: ZoneNode[] = [
  { id: 'foundations', name: 'Foundations', description: 'Basic types and annotations', row: 0, col: 1, color: 'from-blue-500 to-cyan-500' },
  { id: 'unions-narrowing', name: 'Unions & Narrowing', description: 'Union types and type guards', row: 1, col: 0, color: 'from-green-500 to-emerald-500' },
  { id: 'objects', name: 'Objects', description: 'Object types and interfaces', row: 1, col: 2, color: 'from-purple-500 to-pink-500' },
  { id: 'mutability', name: 'Mutability', description: 'Readonly and const assertions', row: 2, col: 0, color: 'from-orange-500 to-red-500' },
  { id: 'classes', name: 'Classes', description: 'Class-based OOP in TypeScript', row: 2, col: 2, color: 'from-indigo-500 to-purple-500' },
  { id: 'ts-features', name: 'TS Features', description: 'Enums, namespaces, and more', row: 3, col: 1, color: 'from-yellow-500 to-orange-500' },
  { id: 'deriving-types', name: 'Deriving Types', description: 'keyof, typeof, and utilities', row: 4, col: 0, color: 'from-teal-500 to-cyan-500' },
  { id: 'assertions', name: 'Assertions', description: 'Type assertions and satisfies', row: 4, col: 2, color: 'from-rose-500 to-pink-500' },
  { id: 'weird-parts', name: 'Weird Parts', description: 'Edge cases and gotchas', row: 5, col: 1, color: 'from-violet-500 to-purple-500' },
  { id: 'modules', name: 'Modules', description: 'Modules and declaration files', row: 6, col: 0, color: 'from-sky-500 to-blue-500' },
  { id: 'type-design', name: 'Type Design', description: 'Generics and advanced types', row: 6, col: 2, color: 'from-fuchsia-500 to-pink-500' },
  { id: 'utility-patterns', name: 'Utility Patterns', description: 'Generic functions and predicates', row: 7, col: 1, color: 'from-amber-500 to-yellow-500' },
];

export default function Zones() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [selectedZone, setSelectedZone] = useState<ZoneNode | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  const getZoneStatus = (zoneId: string) => {
    return progress.zones[zoneId]?.status || 'locked';
  };

  const getZoneProgress = (zoneId: string) => {
    return progress.zones[zoneId]?.progress || 0;
  };

  // Group zones by row
  const rows = new Map<number, ZoneNode[]>();
  zones.forEach(zone => {
    if (!rows.has(zone.row)) {
      rows.set(zone.row, []);
    }
    rows.get(zone.row)!.push(zone);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-ts-blue to-quest-purple bg-clip-text text-transparent">
            Skill Tree
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Master TypeScript by progressing through these interconnected zones.
          Complete exercises and quizzes to unlock new areas.
        </p>
      </div>

      {/* Skill Tree Visualization */}
      <div className="relative mb-12">
        {/* Connection Lines - SVG overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '600px' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3178c6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Zone Nodes */}
        <div className="space-y-8">
          {Array.from(rows.entries())
            .sort(([a], [b]) => a - b)
            .map(([row, rowZones]) => (
              <div key={row} className="flex justify-center gap-8">
                {rowZones
                  .sort((a, b) => a.col - b.col)
                  .map((zone) => {
                    const status = getZoneStatus(zone.id);
                    const zoneProgress = getZoneProgress(zone.id);
                    const isLocked = status === 'locked';
                    const isComplete = status === 'completed';
                    const isInProgress = status === 'in-progress';

                    return (
                      <button
                        key={zone.id}
                        onClick={() => setSelectedZone(zone)}
                        disabled={isLocked}
                        className={`
                          relative w-48 p-4 rounded-xl border-2 transition-all duration-300
                          ${isLocked
                            ? 'bg-slate-800/50 border-slate-700 opacity-50 cursor-not-allowed'
                            : isComplete
                            ? 'bg-gradient-to-br ' + zone.color + ' border-transparent shadow-lg hover:scale-105'
                            : isInProgress
                            ? 'bg-slate-800 border-quest-gold shadow-lg hover:scale-105 animate-glow'
                            : 'bg-slate-800 border-slate-600 hover:border-slate-500 hover:scale-105'
                          }
                        `}
                      >
                        {/* Status Icon */}
                        <div className="absolute -top-3 -right-3">
                          {isComplete && (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="text-white" size={20} />
                            </div>
                          )}
                          {isInProgress && (
                            <div className="w-8 h-8 bg-quest-gold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              <PlayCircle className="text-slate-900" size={20} />
                            </div>
                          )}
                          {isLocked && (
                            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                              <Lock className="text-slate-400" size={16} />
                            </div>
                          )}
                        </div>

                        <h3 className={`font-bold text-lg mb-1 ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                          {zone.name}
                        </h3>
                        <p className={`text-sm ${isLocked ? 'text-slate-600' : 'text-white/70'}`}>
                          {zone.description}
                        </p>

                        {/* Progress Bar */}
                        {!isLocked && (
                          <div className="mt-3">
                            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-white/50 rounded-full transition-all duration-500"
                                style={{ width: `${zoneProgress}%` }}
                              />
                            </div>
                            <div className="text-xs text-white/60 mt-1">{zoneProgress}% complete</div>
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            ))}
        </div>
      </div>

      {/* Selected Zone Details */}
      {selectedZone && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{selectedZone.name}</h2>
              <p className="text-slate-400">{selectedZone.description}</p>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to={`/learn/${selectedZone.id}`}
              className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <div>
                <h3 className="font-bold">Learn</h3>
                <p className="text-slate-400 text-sm">Read the lesson materials</p>
              </div>
              <ChevronRight className="text-slate-400" />
            </Link>

            <Link
              to={`/quiz/${selectedZone.id}`}
              className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <div>
                <h3 className="font-bold">Quiz</h3>
                <p className="text-slate-400 text-sm">Test your knowledge</p>
              </div>
              <ChevronRight className="text-slate-400" />
            </Link>
          </div>

          <div className="mt-4 p-4 bg-slate-900 rounded-lg">
            <h3 className="font-bold mb-2">Start Coding</h3>
            <p className="text-slate-400 text-sm mb-2">
              Run this command in your terminal to start exercises:
            </p>
            <code className="block bg-slate-800 p-3 rounded text-ts-blue font-mono">
              ts-quest start
            </code>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 flex justify-center gap-8 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-quest-gold rounded-full animate-pulse" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-600 rounded-full" />
          <span>Locked</span>
        </div>
      </div>
    </div>
  );
}
