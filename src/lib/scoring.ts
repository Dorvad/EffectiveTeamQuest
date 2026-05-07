import { categoryDefinitions, questions } from "../data/questionnaire";
import type {
  AnswerMap,
  CategoryScore,
  QuestionnaireResult,
  ScoreInterpretation,
} from "../types/questionnaire";

const MAX_CATEGORY_SCORE = 15;
const MAX_TOTAL_SCORE = categoryDefinitions.length * MAX_CATEGORY_SCORE;

export function getScoreInterpretation(score: number): ScoreInterpretation {
  if (score <= 6) {
    return { label: "דורש תשומת לב", tone: "attention" };
  }

  if (score <= 10) {
    return { label: "מתפתח / לא עקבי", tone: "developing" };
  }

  return { label: "חוזקה ברורה", tone: "strength" };
}

export function isQuestionnaireComplete(answers: AnswerMap): boolean {
  return questions.every((question) => answers[question.id] !== undefined);
}

export function calculateQuestionnaireResult(
  answers: AnswerMap,
): QuestionnaireResult {
  const categoryScores: CategoryScore[] = categoryDefinitions.map((category) => {
    const score = category.questionIds.reduce(
      (sum, questionId) => sum + (answers[questionId] ?? 0),
      0,
    );

    return {
      ...category,
      score,
      average: Number((score / category.questionIds.length).toFixed(1)),
      maxScore: MAX_CATEGORY_SCORE,
      interpretation: getScoreInterpretation(score),
    };
  });

  const highestScore = Math.max(...categoryScores.map((category) => category.score));
  const lowestScore = Math.min(...categoryScores.map((category) => category.score));
  const totalScore = categoryScores.reduce(
    (sum, category) => sum + category.score,
    0,
  );
  const completedAnswers = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  return {
    categoryScores,
    strengths: categoryScores.filter((category) => category.score === highestScore),
    opportunities: categoryScores.filter(
      (category) => category.score === lowestScore,
    ),
    totalScore,
    maxTotalScore: MAX_TOTAL_SCORE,
    averageScore: Number((totalScore / categoryDefinitions.length).toFixed(1)),
    completedAnswers,
  };
}
