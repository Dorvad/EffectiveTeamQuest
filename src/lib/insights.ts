import type { CategoryKey, CategoryScore, QuestionnaireResult } from "../types/questionnaire";

type InsightTone = "strength" | "opportunity" | "category";

export type Insight = {
  title: string;
  body: string;
  tone: InsightTone;
};

const strengthInsights: Record<CategoryKey, string> = {
  sharedPurpose:
    "נראה שלצוות יש תחושת כיוון משותפת והיכרות טובה עם המטרות המרכזיות. זו תשתית משמעותית לעבודה מתואמת, מחויבות ויכולת להתקדם יחד.",
  roles:
    "נראה שיש בצוות בהירות טובה סביב תפקידים ותחומי אחריות. כאשר כל אחד יודע מה מצופה ממנו, קל יותר להפחית חיכוך, לשמור על קצב ולהתקדם בביטחון.",
  workMechanism:
    "נראה שהצוות יודע לעבוד דרך תהליכים ברורים וללמוד תוך כדי תנועה. מנגנון עבודה יציב מאפשר עקביות, שיפור מתמשך והפחתת תלות באלתורים.",
  communication:
    "נראה שקיימת בצוות תקשורת פעילה שמקדמת שיתוף מידע, משוב וסנכרון. זו יכולת מרכזית לשמירה על תיאום, אמון וקבלת החלטות טובה יותר.",
  relationships:
    "נראה שקיימת בצוות תשתית יחסים שמאפשרת פתיחות, שיתוף והתמודדות משותפת עם אתגרים. זהו בסיס חשוב לחוסן צוותי ולעבודה איכותית לאורך זמן.",
};

const opportunityInsights: Record<CategoryKey, string> = {
  sharedPurpose:
    "כדאי להשקיע בחידוד המטרה המשותפת ובחיבור של חברי הצוות אליה. שיחה קצרה על יעדים, עדיפויות ותרומת כל חבר צוות יכולה ליצור יותר כיוון ומחויבות.",
  roles:
    "כדאי לבדוק האם קיימת בהירות מספקת סביב תפקידים, אחריות וממשקים. מיפוי פשוט של מי מוביל מה, מי שותף ומתי מעדכנים יכול לצמצם אי־ודאות וחפיפות.",
  workMechanism:
    "כדאי לחזק את מנגנוני העבודה והלמידה של הצוות. הגדירו שגרות קצרות לתכנון, מעקב ולמידה, כך שהתהליך יתמוך בעבודה ולא יכביד עליה.",
  communication:
    "כדאי לשפר את זרימת המידע והמשוב בצוות. מומלץ לקבוע נקודות סנכרון קצרות ולייצר כללים ברורים לשיתוף מידע, מתן משוב וקבלת החלטות.",
  relationships:
    "נראה שכדאי להשקיע בחיזוק מערכת היחסים בצוות. ייתכן שיש מקום לייצר יותר מרחבים בטוחים לשיתוף אישי, הצפת דילמות ופתרון בעיות משותף.",
};

function joinCategoryTitles(categories: CategoryScore[]): string {
  return categories.map((category) => category.title).join(" · ");
}

function createCombinedBody(
  categories: CategoryScore[],
  dictionary: Record<CategoryKey, string>,
): string {
  return categories.map((category) => dictionary[category.key]).join("\n\n");
}

export function createCategoryInsight(category: CategoryScore): Insight {
  const rangeText =
    category.interpretation.tone === "attention"
      ? "זהו תחום שכדאי לתת לו עדיפות קרובה. מומלץ לבחור פעולה אחת קטנה ומדידה שתשפר את החוויה כבר בשבועות הקרובים."
      : category.interpretation.tone === "developing"
        ? "התחום קיים בצוות אך אינו עקבי מספיק. כדאי להפוך התנהגויות טובות לשגרות ברורות ולבדוק מה מפריע להן לקרות באופן קבוע."
        : "זהו מקור כוח שאפשר להמשיך לטפח ואף להשתמש בו כדי לקדם תחומים חלשים יותר בצוות.";

  return {
    title: `${category.title}: ${category.interpretation.label}`,
    body: `${category.description} ${rangeText}`,
    tone: "category",
  };
}

export function generateInsights(result: QuestionnaireResult): Insight[] {
  return [
    {
      title: `חוזקה צוותית: ${joinCategoryTitles(result.strengths)}`,
      body: createCombinedBody(result.strengths, strengthInsights),
      tone: "strength",
    },
    {
      title: `הזדמנות לשיפור: ${joinCategoryTitles(result.opportunities)}`,
      body: createCombinedBody(result.opportunities, opportunityInsights),
      tone: "opportunity",
    },
    ...result.categoryScores.map(createCategoryInsight),
  ];
}
