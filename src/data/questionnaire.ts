import type { CategoryDefinition, Question } from "../types/questionnaire";

export const questionnaireTitle = "שאלון אפיון צוות";

export const introText =
  "השאלון נועד לסייע לך לזהות את החוזקות וההזדמנויות המרכזיות בצוות שלך, דרך חמישה מאפיינים של צוות אפקטיבי. עבור כל היגד, סמן את רמת ההסכמה שלך בסולם של 1 עד 5: 1 = לא מסכים בכלל, 5 = מסכים בהחלט.";

export const questions: Question[] = [
  {
    id: 1,
    statement: "חברי הצוות מכירים את מטרות הצוות ומחוברים אליהם",
    category: "sharedPurpose",
  },
  {
    id: 2,
    statement: "חברי הצוות מכירים את תהליכי העבודה בצוות",
    category: "workMechanism",
  },
  {
    id: 3,
    statement:
      "קיימת אווירת פתיחות הבאה לידי ביטוי בהבעת תחושות כלפי חברי הצוות",
    category: "relationships",
  },
  {
    id: 4,
    statement: "חברי הצוות מכירים את תחומי האחריות של כלל חברי הצוות",
    category: "roles",
  },
  {
    id: 5,
    statement: "חברי הצוות מעודדים שותפות וחולקים מידע אחד עם השני",
    category: "communication",
  },
  {
    id: 6,
    statement:
      "חברי הצוות פועלים בהתאם להגדרות התפקידים שלהם ומבצעים את המשימות אשר נמצאות תחת תחום אחריותם",
    category: "roles",
  },
  {
    id: 7,
    statement: "חברי הצוות מחויבים לצוות ואל מטרותיו המשותפות",
    category: "sharedPurpose",
  },
  {
    id: 8,
    statement: "חברי הצוות מיישמים את תהליכי העבודה בצוות",
    category: "workMechanism",
  },
  {
    id: 9,
    statement: "חברי הצוות מקדמים שיח פתוח המאפשר מתן וקבלת משוב",
    category: "communication",
  },
  {
    id: 10,
    statement: "חברי הצוות מקדמים פתרון בעיות משותף",
    category: "relationships",
  },
  {
    id: 11,
    statement: "חברי הצוות פועלים בשותפות על מנת להשיג את מטרות הצוות",
    category: "sharedPurpose",
  },
  {
    id: 12,
    statement: "חברי הצוות פועלים בסנכרון תוך עידוד שיתוף מידע",
    category: "communication",
  },
  {
    id: 13,
    statement: "חברי הצוות מעודדים שיתוף אישי והצפת אתגרים ודילמות",
    category: "relationships",
  },
  {
    id: 14,
    statement:
      "חברי הצוות פועלים תוך ביצוע תהליכי למידה כחלק משגרת העבודה",
    category: "workMechanism",
  },
  {
    id: 15,
    statement:
      "הגדרת התפקידים בצוות והגדרת תחומי האחריות מאפשרת עבודה אפקטיבית בין חברי הצוות",
    category: "roles",
  },
];

export const categoryDefinitions: CategoryDefinition[] = [
  {
    key: "sharedPurpose",
    title: "מטרה משותפת",
    description:
      "מידת ההיכרות, ההזדהות והמחויבות של חברי הצוות למטרות המשותפות.",
    guidance:
      "חזקו שיח קבוע על יעדי הצוות, סדרי עדיפויות והאופן שבו כל חבר צוות תורם להשגתם.",
    questionIds: [1, 7, 11],
  },
  {
    key: "roles",
    title: "תפקידים ואחריות",
    description:
      "בהירות התפקידים, תחומי האחריות והיכולת לפעול בצורה אפקטיבית בהתאם להם.",
    guidance:
      "מפו אחריות, ממשקים וציפיות כדי לצמצם כפילויות, פערים וחיכוך מיותר.",
    questionIds: [4, 6, 15],
  },
  {
    key: "workMechanism",
    title: "מכניזם של עבודה",
    description: "מידת ההיכרות, היישום והלמידה סביב תהליכי העבודה בצוות.",
    guidance:
      "הפכו תהליכי עבודה, למידה ותיאום לשגרה פשוטה, גלויה וניתנת לשיפור מתמשך.",
    questionIds: [2, 8, 14],
  },
  {
    key: "communication",
    title: "תקשורת",
    description: "שיתוף מידע, שיח פתוח, משוב וסנכרון בין חברי הצוות.",
    guidance:
      "צרו מנגנוני עדכון ומשוב קצרים שמבטיחים זרימת מידע, תיאום וקבלת החלטות טובה יותר.",
    questionIds: [5, 9, 12],
  },
  {
    key: "relationships",
    title: "מערכת יחסים",
    description:
      "פתיחות, אמון, שיתוף אישי, פתרון בעיות והצפת אתגרים ודילמות.",
    guidance:
      "השקיעו בבניית אמון, מרחבים בטוחים לשיתוף ותרגול פתרון בעיות כצוות.",
    questionIds: [3, 10, 13],
  },
];
