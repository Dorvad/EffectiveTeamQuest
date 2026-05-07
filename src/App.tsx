import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Download, Sparkles } from "lucide-react";

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative flex min-h-screen items-center justify-center px-5 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.18),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-3xl rounded-[2rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">
            <Sparkles className="h-4 w-4" />
            שאלון דיגיטלי לאפיון צוות
          </div>

          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
            >
              לזהות חוזקות והזדמנויות בצוות
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="max-w-2xl text-pretty text-lg leading-8 text-slate-300"
            >
              האפליקציה תאפשר למנהלים למלא שאלון קצר על מאפייני הצוות,
              לקבל תמונת מצב ויזואלית וברורה, לזהות את החוזקה המרכזית של
              הצוות ואת ההזדמנות המשמעותית ביותר לשיפור, ולהוריד את התוצאות
              כתמונה למכשיר.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="תוצאות ברורות"
              text="חישוב אוטומטי של חמשת מאפייני הצוות."
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Insights"
              text="תובנות מילוליות לפי הדפוסים שעולים מהתשובות."
            />
            <FeatureCard
              icon={<Download className="h-5 w-5" />}
              title="ייצוא תמונה"
              text="הורדת כרטיס תוצאה מעוצב ישירות למכשיר."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-300 px-6 py-4 text-base font-bold text-slate-950 shadow-lg shadow-teal-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-200 active:translate-y-0"
            >
              התחלת השאלון
              <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
            </button>

            <p className="text-sm leading-6 text-slate-400">
              זהו שלד ראשוני בלבד. Codex יחליף את המסך הזה בזרימה מלאה:
              כניסה, שאלון ותוצאות.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-teal-200">
        {icon}
      </div>
      <h2 className="mb-1 font-bold text-white">{title}</h2>
      <p className="text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

export default App;
