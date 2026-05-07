import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { questions } from "../data/questionnaire";
import { isQuestionnaireComplete } from "../lib/scoring";
import type { AnswerMap, AnswerValue } from "../types/questionnaire";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { Button } from "./ui/Button";

type QuestionnaireScreenProps = {
  answers: AnswerMap;
  onAnswersChange: (answers: AnswerMap) => void;
  onComplete: () => void;
};

const AUTO_ADVANCE_DELAY = 320;

export function QuestionnaireScreen({
  answers,
  onAnswersChange,
  onComplete,
}: QuestionnaireScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoAdvanceTimer = useRef<number | null>(null);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const canShowResults = useMemo(() => isQuestionnaireComplete(answers), [answers]);
  const answeredCount = questions.filter((question) => answers[question.id] !== undefined).length;

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) {
        window.clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, []);

  function clearAutoAdvance() {
    if (autoAdvanceTimer.current) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
  }

  function moveToQuestion(index: number) {
    clearAutoAdvance();
    setCurrentIndex(Math.max(0, Math.min(index, questions.length - 1)));
  }

  function handleAnswer(value: AnswerValue) {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    onAnswersChange(nextAnswers);
    clearAutoAdvance();

    if (!isLastQuestion) {
      autoAdvanceTimer.current = window.setTimeout(() => {
        setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
      }, AUTO_ADVANCE_DELAY);
    }
  }

  function goNext() {
    if (!isLastQuestion) {
      moveToQuestion(currentIndex + 1);
      return;
    }

    if (canShowResults) {
      onComplete();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <section className="relative min-h-dvh px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-3 z-10 rounded-[1.5rem] border border-white/70 bg-white/85 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl sm:static"
        >
          <ProgressBar current={currentIndex + 1} total={questions.length} />
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1" dir="rtl" aria-label="מעבר בין שאלות">
            {questions.map((question, index) => {
              const isCurrent = index === currentIndex;
              const isAnswered = answers[question.id] !== undefined;

              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => moveToQuestion(index)}
                  aria-label={`מעבר לשאלה ${question.id}`}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                    isCurrent
                      ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                      : isAnswered
                        ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {isAnswered && !isCurrent ? <Check className="h-4 w-4" /> : question.id}
                </button>
              );
            })}
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>

        <div className="rounded-[1.5rem] border border-white/70 bg-white/75 p-3 shadow-sm backdrop-blur sm:p-4">
          <div className="mb-3 flex items-center justify-between text-sm font-bold text-slate-500">
            <span>{answeredCount} מתוך {questions.length} היגדים נענו</span>
            <span>{canShowResults ? "מוכן להצגת תוצאות" : "אפשר לחזור ולתקן בכל שלב"}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
            <Button variant="secondary" onClick={() => moveToQuestion(currentIndex - 1)} disabled={currentIndex === 0}>
              <ArrowRight className="h-5 w-5" />
              חזרה
            </Button>

            <Button
              onClick={goNext}
              disabled={isLastQuestion ? !canShowResults : answers[currentQuestion.id] === undefined}
              className="min-w-0 sm:min-w-44"
            >
              {isLastQuestion ? "הצגת תוצאות" : "המשך"}
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
