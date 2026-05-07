import type { AnswerValue } from "../types/questionnaire";

const values: AnswerValue[] = [1, 2, 3, 4, 5];

type ScaleSelectorProps = {
  value?: AnswerValue;
  onChange: (value: AnswerValue) => void;
};

export function ScaleSelector({ value, onChange }: ScaleSelectorProps) {
  return (
    <div className="space-y-4" role="radiogroup" aria-label="סולם הסכמה: 1 לא מסכים בכלל, 5 מסכים בהחלט">
      <div className="grid grid-cols-5 gap-2" dir="ltr">
        {values.map((scaleValue) => {
          const isSelected = value === scaleValue;

          return (
            <button
              key={scaleValue}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(scaleValue)}
              className={`flex aspect-square min-h-14 items-center justify-center rounded-2xl border text-lg font-black transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                isSelected
                  ? "scale-105 border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-900/20"
                  : "border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-1 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md"
              }`}
            >
              {scaleValue}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-slate-500" dir="ltr">
        <span className="col-span-2 justify-self-start text-left" dir="rtl">
          1 = לא מסכים בכלל
        </span>
        <span className="col-span-2 col-start-4 justify-self-end text-right" dir="rtl">
          5 = מסכים בהחלט
        </span>
      </div>
    </div>
  );
}
