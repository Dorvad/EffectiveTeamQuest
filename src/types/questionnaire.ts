export type CategoryKey =
  | "sharedPurpose"
  | "roles"
  | "workMechanism"
  | "communication"
  | "relationships";

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export type Question = {
  id: number;
  statement: string;
  category: CategoryKey;
};

export type AnswerMap = Partial<Record<number, AnswerValue>>;

export type CategoryDefinition = {
  key: CategoryKey;
  title: string;
  description: string;
  guidance: string;
  questionIds: number[];
};

export type ScoreInterpretation = {
  label: string;
  tone: "attention" | "developing" | "strength";
};

export type CategoryScore = {
  key: CategoryKey;
  title: string;
  description: string;
  guidance: string;
  questionIds: number[];
  score: number;
  average: number;
  maxScore: number;
  interpretation: ScoreInterpretation;
};

export type QuestionnaireResult = {
  categoryScores: CategoryScore[];
  strengths: CategoryScore[];
  opportunities: CategoryScore[];
  totalScore: number;
  maxTotalScore: number;
  averageScore: number;
  completedAnswers: number;
};
