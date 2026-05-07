import { Award, Target } from "lucide-react";
import type { QuestionnaireResult } from "../types/questionnaire";
import { Pill } from "./ui/Pill";

type ResultsSummaryCardProps = {
  result: QuestionnaireResult;
};

function titles(categories: QuestionnaireResult["strengths"]) {
  return categories.map((category) => category.title).join(" · ");
}

export function ResultsSummaryCard({ result }: ResultsSummaryCardProps) {
  return (
    <div className="space-y-5 rounded-[1.75rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-200/80">
      <div>
        <Pill tone="teal" className="!border-white/10 !bg-white/10 !text-teal-100">
          ציון כולל {result.totalScore}/{result.maxTotalScore}
        </Pill>
        <h2 className="mt-4 text-3xl font-black">תמונת מצב צוותית</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          ממוצע קטגוריאלי: {result.averageScore} מתוך 15 · {result.completedAnswers} תשובות
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-teal-300/20 bg-teal-300/10 p-4">
          <Award className="mb-3 h-6 w-6 text-teal-200" />
          <p className="text-sm font-bold text-teal-100">חוזקה מרכזית</p>
          <p className="mt-1 text-xl font-black">{titles(result.strengths)}</p>
        </div>
        <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4">
          <Target className="mb-3 h-6 w-6 text-amber-200" />
          <p className="text-sm font-bold text-amber-100">הזדמנות לשיפור</p>
          <p className="mt-1 text-xl font-black">{titles(result.opportunities)}</p>
        </div>
      </div>
    </div>
  );
}
