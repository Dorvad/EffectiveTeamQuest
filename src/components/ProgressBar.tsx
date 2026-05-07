type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-2" aria-label={`התקדמות ${percentage}%`}>
      <div className="flex items-center justify-between text-sm font-bold text-slate-600">
        <span>
          שאלה {current} מתוך {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-l from-teal-400 via-cyan-400 to-indigo-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
