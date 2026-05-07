import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowLeft, BarChart3, Download, ShieldCheck, Sparkles } from "lucide-react";
import { introText, questionnaireTitle } from "../data/questionnaire";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Pill } from "./ui/Pill";

type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <section className="relative flex min-h-dvh items-center justify-center px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.18),transparent_36%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-5xl"
      >
        <Card elevated className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-7 p-6 sm:p-10">
              <Pill tone="teal" className="w-fit">
                <Sparkles className="ml-1 h-4 w-4" /> אבחון קצר וממוקד
              </Pill>

              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
                  {questionnaireTitle}
                </h1>
                <p className="text-pretty text-xl font-bold leading-8 text-slate-700">
                  לזהות במה הצוות חזק — ואיפה כדאי להשקיע כדי לעבוד טוב יותר יחד.
                </p>
                <p className="text-base leading-8 text-slate-600">{introText}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <IntroFact icon={<BarChart3 />} title="5 מאפיינים" text="השוואה ויזואלית בין תחומי הצוות." />
                <IntroFact icon={<ShieldCheck />} title="15 היגדים" text="מענה קצר, אינטואיטיבי וללא שמירת מידע." />
                <IntroFact icon={<Download />} title="תמונה להורדה" text="כרטיס תוצאה נקי לשיתוף או שמירה." />
              </div>

              <Button onClick={onStart} fullWidth className="sm:w-auto sm:px-8">
                התחלת השאלון
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative min-h-72 overflow-hidden bg-slate-950 p-6 text-white sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.32),transparent_30%),radial-gradient(circle_at_80%_72%,rgba(129,140,248,0.34),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="mb-3 text-sm font-bold text-teal-200">סולם המענה</p>
                  <div className="grid grid-cols-5 gap-2" dir="ltr">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div
                        key={value}
                        className="flex aspect-square items-center justify-center rounded-2xl bg-white/10 text-lg font-black ring-1 ring-white/10"
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-5 gap-2 text-sm text-slate-300" dir="ltr">
                    <span className="col-span-2 justify-self-start text-left" dir="rtl">
                      1 = לא מסכים בכלל
                    </span>
                    <span className="col-span-2 col-start-4 justify-self-end text-right" dir="rtl">
                      5 = מסכים בהחלט
                    </span>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm leading-6 text-slate-200">
                    התוצאה מציגה חוזקות, הזדמנויות ותובנות מעשיות — ללא התחברות, ללא שרת וללא שמירת מידע חיצונית.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

type IntroFactProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

function IntroFact({ icon, title, text }: IntroFactProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <h2 className="font-black text-slate-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
