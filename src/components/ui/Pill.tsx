import type { ReactNode } from "react";

type PillTone = "teal" | "indigo" | "amber" | "rose" | "slate";

type PillProps = {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
};

const toneClasses: Record<PillTone, string> = {
  teal: "border-teal-200 bg-teal-50 text-teal-800",
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  rose: "border-rose-200 bg-rose-50 text-rose-800",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
};

export function Pill({ children, tone = "slate", className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-bold ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
