import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useMemo, useRef } from "react";
import { generateInsights } from "../lib/insights";
import { calculateQuestionnaireResult } from "../lib/scoring";
import type { AnswerMap } from "../types/questionnaire";
import { CategoryScoreCard } from "./CategoryScoreCard";
import { DownloadResultButton } from "./DownloadResultButton";
import { InsightPanel } from "./InsightPanel";
import { ResultExportCard } from "./ResultExportCard";
import { ResultsChart } from "./ResultsChart";
import { ResultsSummaryCard } from "./ResultsSummaryCard";
import { Button } from "./ui/Button";

type ResultsScreenProps = {
  answers: AnswerMap;
  onRestart: () => void;
};

export function ResultsScreen({ answers, onRestart }: ResultsScreenProps) {
  const result = useMemo(() => calculateQuestionnaireResult(answers), [answers]);
  const insights = useMemo(() => generateInsights(result), [result]);
  const exportCardRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="relative min-h-dvh px-4 py-6 sm:px-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]"
      >
        <div className="space-y-5 rounded-[2rem] bg-slate-50/80 p-2 ring-1 ring-white/70 sm:p-4">
          <ResultsSummaryCard result={result} />
          <ResultsChart scores={result.categoryScores} />

          <div className="grid gap-3 sm:grid-cols-2">
            {result.categoryScores.map((category) => (
              <CategoryScoreCard key={category.key} category={category} />
            ))}
          </div>

          <InsightPanel insights={insights} />
        </div>

        <aside className="space-y-3 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur">
            <h2 className="text-xl font-black text-slate-950">מה עושים עכשיו?</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              שמרו את כרטיס התוצאה, שתפו עם הצוות ובחרו פעולה אחת מתוך תחום ההזדמנות לשיפור.
            </p>
          </div>

          <DownloadResultButton targetRef={exportCardRef} />
          <Button variant="secondary" onClick={onRestart} fullWidth>
            <RotateCcw className="h-5 w-5" />
            מילוי מחדש
          </Button>
        </aside>

        <div className="pointer-events-none fixed right-[-9999px] top-0" aria-hidden="true">
          <div ref={exportCardRef}>
            <ResultExportCard result={result} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
