import type { QuestionnaireResult } from "../types/questionnaire";

type ResultExportCardProps = {
  result: QuestionnaireResult;
};

function joinTitles(categories: QuestionnaireResult["strengths"]) {
  return categories.map((category) => category.title).join(" · ");
}

export function ResultExportCard({ result }: ResultExportCardProps) {
  return (
    <div
      className="w-[390px] overflow-hidden rounded-[2rem] bg-slate-50 p-5 text-slate-950 shadow-2xl"
      dir="rtl"
    >
      <div className="rounded-[1.6rem] bg-slate-950 p-5 text-white">
        <p className="text-sm font-bold text-teal-200">שאלון אפיון צוות</p>
        <h2 className="mt-2 text-3xl font-black">תמונת מצב צוותית</h2>
        <p className="mt-2 text-sm text-slate-300">
          ציון כולל {result.totalScore}/{result.maxTotalScore} · ממוצע {result.averageScore}/15
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        <ExportHighlight label="חוזקה מרכזית" value={joinTitles(result.strengths)} tone="teal" />
        <ExportHighlight label="הזדמנות לשיפור" value={joinTitles(result.opportunities)} tone="amber" />
      </div>

      <div className="mt-4 space-y-2">
        {result.categoryScores.map((category) => {
          const percentage = Math.round((category.score / category.maxScore) * 100);

          return (
            <div key={category.key} className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-black">{category.title}</span>
                <span className="text-sm font-black" dir="ltr">
                  {category.score}/15
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-teal-400 to-indigo-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-bold text-slate-500">
                {category.interpretation.label}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs font-bold text-slate-400">
        נוצר באופן מקומי במכשיר · ללא שמירת מידע בשרת
      </p>
    </div>
  );
}

type ExportHighlightProps = {
  label: string;
  value: string;
  tone: "teal" | "amber";
};

function ExportHighlight({ label, value, tone }: ExportHighlightProps) {
  const toneClass =
    tone === "teal"
      ? "border-teal-200 bg-teal-50 text-teal-950"
      : "border-amber-200 bg-amber-50 text-amber-950";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-xs font-bold opacity-80">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}
