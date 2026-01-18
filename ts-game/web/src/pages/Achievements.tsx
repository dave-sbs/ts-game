import { useEffect, useState } from 'react';
import { Trophy, Lock, Star, Flame, Zap, Target, Code, BookOpen, Award } from 'lucide-react';
import { loadProgress, type Progress } from '../lib/progress';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const allAchievements: Achievement[] = [
  {
    id: 'first-exercise',
    name: 'First Steps',
    description: 'Complete your first exercise',
    icon: <Star size={24} />,
    xp: 50,
    rarity: 'common'
  },
  {
    id: 'ten-exercises',
    name: 'Getting Serious',
    description: 'Complete 10 exercises',
    icon: <Target size={24} />,
    xp: 100,
    rarity: 'common'
  },
  {
    id: 'streak-3',
    name: 'On Fire',
    description: 'Maintain a 3 day streak',
    icon: <Flame size={24} />,
    xp: 75,
    rarity: 'common'
  },
  {
    id: 'streak-7',
    name: 'Dedicated Learner',
    description: 'Maintain a 7 day streak',
    icon: <Flame size={24} />,
    xp: 150,
    rarity: 'rare'
  },
  {
    id: 'no-hints',
    name: 'Self Sufficient',
    description: 'Complete an exercise without using hints',
    icon: <Zap size={24} />,
    xp: 50,
    rarity: 'common'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete an exercise in under 1 minute',
    icon: <Zap size={24} />,
    xp: 75,
    rarity: 'rare'
  },
  {
    id: 'zone-1-complete',
    name: 'Foundation Master',
    description: 'Complete all exercises in the Foundations zone',
    icon: <Award size={24} />,
    xp: 200,
    rarity: 'rare'
  },
  {
    id: 'quiz-perfect',
    name: 'Quiz Ace',
    description: 'Score 100% on any quiz',
    icon: <BookOpen size={24} />,
    xp: 100,
    rarity: 'rare'
  },
  {
    id: 'fifty-exercises',
    name: 'TypeScript Warrior',
    description: 'Complete 50 exercises',
    icon: <Trophy size={24} />,
    xp: 300,
    rarity: 'epic'
  },
  {
    id: 'all-zones',
    name: 'Type System Master',
    description: 'Complete all zones',
    icon: <Trophy size={24} />,
    xp: 1000,
    rarity: 'legendary'
  },
  {
    id: 'streak-30',
    name: 'Unstoppable',
    description: 'Maintain a 30 day streak',
    icon: <Flame size={24} />,
    xp: 500,
    rarity: 'legendary'
  },
  {
    id: 'hundred-exercises',
    name: 'TypeScript Legend',
    description: 'Complete 100 exercises',
    icon: <Code size={24} />,
    xp: 500,
    rarity: 'legendary'
  }
];

const rarityColors = {
  common: 'from-slate-500 to-slate-600',
  rare: 'from-blue-500 to-cyan-500',
  epic: 'from-purple-500 to-pink-500',
  legendary: 'from-yellow-500 to-orange-500'
};

const rarityBorders = {
  common: 'border-slate-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-yellow-500'
};

export default function Achievements() {
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

  const earnedAchievements = new Set(progress.achievements);
  const earnedCount = earnedAchievements.size;
  const totalCount = allAchievements.length;

  // Sort: earned first, then by rarity
  const sortedAchievements = [...allAchievements].sort((a, b) => {
    const aEarned = earnedAchievements.has(a.id);
    const bEarned = earnedAchievements.has(b.id);
    if (aEarned !== bEarned) return bEarned ? 1 : -1;
    
    const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3 };
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-quest-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="text-quest-gold" size={40} />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-quest-gold to-orange-500 bg-clip-text text-transparent">
            Achievements
          </span>
        </h1>
        <p className="text-slate-400 text-lg">
          {earnedCount} of {totalCount} achievements unlocked
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mt-4">
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-quest-gold to-orange-500 transition-all duration-500"
              style={{ width: `${(earnedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAchievements.map((achievement) => {
          const isEarned = earnedAchievements.has(achievement.id);
          
          return (
            <div
              key={achievement.id}
              className={`
                relative bg-slate-800 rounded-xl p-6 border-2 transition-all duration-300
                ${isEarned
                  ? `${rarityBorders[achievement.rarity]} shadow-lg`
                  : 'border-slate-700 opacity-60'
                }
              `}
            >
              {/* Rarity Badge */}
              <div className={`
                absolute -top-3 -right-3 px-2 py-0.5 rounded-full text-xs font-bold uppercase
                bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white
              `}>
                {achievement.rarity}
              </div>

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                  ${isEarned
                    ? `bg-gradient-to-br ${rarityColors[achievement.rarity]}`
                    : 'bg-slate-700'
                  }
                `}>
                  {isEarned ? (
                    <span className="text-white">{achievement.icon}</span>
                  ) : (
                    <Lock className="text-slate-500" size={24} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg ${isEarned ? 'text-white' : 'text-slate-500'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm ${isEarned ? 'text-slate-400' : 'text-slate-600'}`}>
                    {achievement.description}
                  </p>
                  
                  {/* XP Badge */}
                  <div className={`
                    inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-bold
                    ${isEarned
                      ? 'bg-quest-gold/20 text-quest-gold'
                      : 'bg-slate-700 text-slate-500'
                    }
                  `}>
                    <Zap size={12} />
                    +{achievement.xp} XP
                  </div>
                </div>
              </div>

              {/* Earned Checkmark */}
              {isEarned && (
                <div className="absolute bottom-4 right-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rarity Legend */}
      <div className="mt-12 flex justify-center gap-6 text-sm">
        {(['common', 'rare', 'epic', 'legendary'] as const).map((rarity) => (
          <div key={rarity} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${rarityColors[rarity]}`} />
            <span className="text-slate-400 capitalize">{rarity}</span>
          </div>
        ))}
      </div>

      {/* Motivation */}
      {earnedCount === 0 && (
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
          <h2 className="text-xl font-bold mb-2">Start Your Journey!</h2>
          <p className="text-slate-400 mb-4">
            Complete exercises and quizzes to unlock achievements and earn XP.
          </p>
          <code className="bg-slate-700 px-4 py-2 rounded-lg text-ts-blue">
            ts-quest start
          </code>
        </div>
      )}
    </div>
  );
}
