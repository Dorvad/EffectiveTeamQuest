import { Lightbulb, TrendingUp } from "lucide-react";
import type { Insight } from "../lib/insights";
import { Card } from "./ui/Card";

type InsightPanelProps = {
  insights: Insight[];
};

const panelClasses = {
  strength: "border-teal-200 bg-teal-50/90 text-teal-900",
  opportunity: "border-amber-200 bg-amber-50/90 text-amber-900",
  category: "border-slate-200 bg-white/90 text-slate-800",
} as const;

export function InsightPanel({ insights }: InsightPanelProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-black text-slate-950">תובנות והמלצות</h3>
        <p className="mt-1 text-sm text-slate-500">ניסוח קצר שמתרגם את הציונים לפעולה.</p>
      </div>
      {insights.map((insight) => (
        <Card key={insight.title} className={`p-4 ${panelClasses[insight.tone]}`}>
          <div className="flex items-start gap-3">
            <div className="mt-1 shrink-0 rounded-2xl bg-white/70 p-2">
              {insight.tone === "strength" ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <Lightbulb className="h-5 w-5" />
              )}
            </div>
            <div>
              <h4 className="font-black">{insight.title}</h4>
              <p className="mt-1 whitespace-pre-line text-sm leading-7">{insight.body}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
