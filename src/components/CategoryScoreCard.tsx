import type { CategoryScore } from "../types/questionnaire";
import { Card } from "./ui/Card";
import { Pill } from "./ui/Pill";

type CategoryScoreCardProps = {
  category: CategoryScore;
};

const interpretationTone = {
  attention: "rose",
  developing: "amber",
  strength: "teal",
} as const;

export function CategoryScoreCard({ category }: CategoryScoreCardProps) {
  const percentage = Math.round((category.score / category.maxScore) * 100);

  return (
    <Card className="space-y-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-slate-950">{category.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{category.description}</p>
        </div>
        <div className="shrink-0 text-left" dir="ltr">
          <span className="text-3xl font-black text-slate-950">{category.score}</span>
          <span className="text-sm font-bold text-slate-500">/{category.maxScore}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-l from-teal-400 to-indigo-400"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Pill tone={interpretationTone[category.interpretation.tone]}>
            {category.interpretation.label}
          </Pill>
          <span className="text-xs font-bold text-slate-500">
            ממוצע {category.average} מתוך 5
          </span>
        </div>
      </div>
    </Card>
  );
}
