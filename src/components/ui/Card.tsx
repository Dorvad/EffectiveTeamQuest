import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  elevated?: boolean;
};

export function Card({ children, className = "", elevated = false, ...props }: CardProps) {
  return (
    <div
      className={`rounded-[1.75rem] border border-white/75 bg-white/[0.88] p-5 shadow-sm backdrop-blur-xl ${
        elevated ? "shadow-2xl shadow-slate-200/80" : "shadow-slate-200/60"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
