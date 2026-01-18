import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Zap, Star, Play, BookOpen, Trophy, Target } from 'lucide-react';
import { loadProgress, getLevelTitle, formatXP, type Progress } from '../lib/progress';
import XPBar from '../components/XPBar';

export default function Dashboard() {
  const [progress, setProgress] = useState<Progress | null>(null);

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

  const { profile, zones, achievements } = progress;
  const totalXP = profile.xp + (profile.level - 1) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome, <span className="text-quest-gold">{getLevelTitle(profile.level)}</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Continue your TypeScript journey and master the type system!
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-ts-blue">{profile.level}</div>
              <div className="text-slate-500 text-sm">Level</div>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-4xl font-bold text-quest-gold">{formatXP(totalXP)}</div>
              <div className="text-slate-500 text-sm">Total XP</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <XPBar current={profile.xp} max={profile.xpToNextLevel} level={profile.level} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Flame className="text-orange-500" size={20} />
            </div>
            <div className="text-2xl font-bold">{profile.currentStreak}</div>
          </div>
          <div className="text-slate-400 text-sm">Day Streak</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-500" size={20} />
            </div>
            <div className="text-2xl font-bold">{profile.longestStreak}</div>
          </div>
          <div className="text-slate-400 text-sm">Best Streak</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Target className="text-green-500" size={20} />
            </div>
            <div className="text-2xl font-bold">{progress.exerciseHistory.length}</div>
          </div>
          <div className="text-slate-400 text-sm">Exercises Done</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="text-purple-500" size={20} />
            </div>
            <div className="text-2xl font-bold">{achievements.length}</div>
          </div>
          <div className="text-slate-400 text-sm">Achievements</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Zone Progress */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-quest-gold" size={24} />
            Zone Progress
          </h2>
          
          <div className="space-y-4">
            {Object.entries(zones).slice(0, 5).map(([zoneId, zoneProgress]) => {
              const zoneNames: Record<string, string> = {
                'foundations': 'Foundations',
                'unions-narrowing': 'Unions & Narrowing',
                'objects': 'Objects',
                'mutability': 'Mutability',
                'classes': 'Classes',
              };
              
              return (
                <div key={zoneId} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    zoneProgress.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    zoneProgress.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-700 text-slate-500'
                  }`}>
                    {zoneProgress.status === 'completed' ? '✓' :
                     zoneProgress.status === 'in-progress' ? '▶' : '🔒'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={zoneProgress.status === 'locked' ? 'text-slate-500' : 'text-white'}>
                        {zoneNames[zoneId] || zoneId}
                      </span>
                      <span className="text-slate-400 text-sm">{zoneProgress.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          zoneProgress.status === 'completed' ? 'bg-green-500' :
                          zoneProgress.status === 'in-progress' ? 'bg-yellow-500' :
                          'bg-slate-600'
                        }`}
                        style={{ width: `${zoneProgress.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Link
            to="/zones"
            className="mt-6 block text-center py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors"
          >
            View Full Skill Tree
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-ts-blue to-quest-purple p-4 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Play className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Start Next Exercise</h3>
                  <p className="text-white/70 text-sm">
                    Run <code className="bg-white/20 px-2 rounded">ts-quest start</code>
                  </p>
                </div>
              </div>
            </div>
            
            <Link
              to="/learn/basic-annotations"
              className="block bg-slate-700 hover:bg-slate-600 p-4 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-quest-gold/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="text-quest-gold" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Read Lessons</h3>
                  <p className="text-slate-400 text-sm">Learn TypeScript concepts</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/quiz/basic-annotations"
              className="block bg-slate-700 hover:bg-slate-600 p-4 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-quest-purple/20 rounded-xl flex items-center justify-center">
                  <Zap className="text-quest-purple" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Take a Quiz</h3>
                  <p className="text-slate-400 text-sm">Test your knowledge</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/achievements"
              className="block bg-slate-700 hover:bg-slate-600 p-4 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-quest-green/20 rounded-xl flex items-center justify-center">
                  <Trophy className="text-quest-green" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">View Achievements</h3>
                  <p className="text-slate-400 text-sm">{achievements.length} badges earned</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CLI Instructions */}
      <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-ts-blue font-mono">&gt;_</span>
          CLI Commands
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 rounded-lg p-3">
            <code className="text-ts-blue text-sm">ts-quest status</code>
            <p className="text-slate-400 text-xs mt-1">View progress</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <code className="text-ts-blue text-sm">ts-quest start</code>
            <p className="text-slate-400 text-xs mt-1">Start exercise</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <code className="text-ts-blue text-sm">ts-quest check</code>
            <p className="text-slate-400 text-xs mt-1">Validate solution</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <code className="text-ts-blue text-sm">ts-quest hint</code>
            <p className="text-slate-400 text-xs mt-1">Get a hint</p>
          </div>
        </div>
      </div>
    </div>
  );
}
