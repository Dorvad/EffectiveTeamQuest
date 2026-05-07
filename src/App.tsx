import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { QuestionnaireScreen } from "./components/QuestionnaireScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import type { AnswerMap } from "./types/questionnaire";

type Screen = "intro" | "questionnaire" | "results";

const STORAGE_KEY = "team-diagnosis-answers";

function readStoredAnswers(): AnswerMap {
  try {
    const storedAnswers = window.localStorage.getItem(STORAGE_KEY);
    return storedAnswers ? (JSON.parse(storedAnswers) as AnswerMap) : {};
  } catch {
    return {};
  }
}

function persistAnswers(answers: AnswerMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // The questionnaire is fully usable even if localStorage is unavailable.
  }
}

function clearStoredAnswers() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures in restricted browser modes.
  }
}

function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<AnswerMap>(readStoredAnswers);

  useEffect(() => {
    persistAnswers(answers);
  }, [answers]);

  function restart() {
    setAnswers({});
    clearStoredAnswers();
    setScreen("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-dvh overflow-hidden bg-slate-100 text-slate-950">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_42%,#eef2ff_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.14),transparent_34%)]" />
      <div className="fixed inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-white/80 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          {screen === "intro" ? (
            <IntroScreen onStart={() => setScreen("questionnaire")} />
          ) : null}

          {screen === "questionnaire" ? (
            <QuestionnaireScreen
              answers={answers}
              onAnswersChange={setAnswers}
              onComplete={() => setScreen("results")}
            />
          ) : null}

          {screen === "results" ? <ResultsScreen answers={answers} onRestart={restart} /> : null}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default App;
