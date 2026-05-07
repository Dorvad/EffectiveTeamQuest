import { motion } from "framer-motion";
import type { AnswerValue, Question } from "../types/questionnaire";
import { Card } from "./ui/Card";
import { Pill } from "./ui/Pill";
import { ScaleSelector } from "./ScaleSelector";

type QuestionCardProps = {
  question: Question;
  value?: AnswerValue;
  onAnswer: (value: AnswerValue) => void;
};

export function QuestionCard({ question, value, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: -24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <Card elevated className="space-y-7 p-6 sm:p-8">
        <div className="space-y-4">
          <Pill tone="teal">היגד {question.id}</Pill>
          <h2 className="text-balance text-2xl font-black leading-10 text-slate-950 sm:text-3xl">
            {question.statement}
          </h2>
        </div>

        <ScaleSelector value={value} onChange={onAnswer} />
      </Card>
    </motion.div>
  );
}
