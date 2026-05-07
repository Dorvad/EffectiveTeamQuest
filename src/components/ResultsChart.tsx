import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CategoryScore } from "../types/questionnaire";
import { Card } from "./ui/Card";

type ResultsChartProps = {
  scores: CategoryScore[];
};

const barColors = ["#0f766e", "#2563eb", "#7c3aed", "#d97706", "#be123c"];

export function ResultsChart({ scores }: ResultsChartProps) {
  const data = scores.map((category) => ({
    title: category.title,
    score: category.score,
    percentage: Math.round((category.score / category.maxScore) * 100),
  }));

  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-950">השוואת חמשת המאפיינים</h3>
          <p className="text-sm leading-6 text-slate-500">
            תרשים עמודות קריא למובייל, בציון 3–15 לכל מאפיין.
          </p>
        </div>
        <span className="text-xs font-bold text-slate-400">מקסימום 15</span>
      </div>

      <div className="h-80 w-full sm:h-72" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 6, right: 34, left: 8, bottom: 6 }}
            barCategoryGap={14}
          >
            <defs>
              <linearGradient id="scoreBar" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 6" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 15]}
              ticks={[0, 5, 10, 15]}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="title"
              width={112}
              tick={{ fill: "#0f172a", fontSize: 13, fontWeight: 800 }}
              axisLine={false}
              tickLine={false}
              orientation="right"
            />
            <Tooltip
              cursor={{ fill: "rgba(15, 23, 42, 0.04)" }}
              formatter={(value) => [`${value}/15`, "ציון"]}
              labelStyle={{ direction: "rtl", textAlign: "right", fontWeight: 800 }}
              contentStyle={{ direction: "rtl", borderRadius: 16, borderColor: "#e2e8f0" }}
            />
            <Bar dataKey="score" radius={[0, 14, 14, 0]} barSize={18} fill="url(#scoreBar)">
              {data.map((entry, index) => (
                <Cell key={entry.title} fill={barColors[index % barColors.length]} />
              ))}
              <LabelList
                dataKey="score"
                position="right"
                formatter={(value: number) => `${value}/15`}
                style={{ fill: "#0f172a", fontSize: 12, fontWeight: 900 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
