interface XPBarProps {
  current: number;
  max: number;
  level: number;
}

export default function XPBar({ current, max, level }: XPBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-400">Level {level}</span>
        <span className="text-sm text-slate-400">
          {current} / {max} XP
        </span>
      </div>
      <div className="h-4 bg-slate-700 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-ts-blue to-quest-purple rounded-full transition-all duration-500 relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
        </div>
        {/* Level markers */}
        <div className="absolute inset-0 flex">
          {[25, 50, 75].map((marker) => (
            <div
              key={marker}
              className="absolute top-0 bottom-0 w-px bg-slate-600"
              style={{ left: `${marker}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slate-500">0%</span>
        <span className="text-xs text-slate-500">Next Level</span>
      </div>
    </div>
  );
}
