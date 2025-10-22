// src/components/ui/Button.tsx
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function Button({ loading, className = "", children, ...rest }: Props) {
  return (
    <button
      className={
        "w-full rounded-2xl px-4 py-3 font-semibold text-slate-800 backdrop-blur transition-all duration-200 active:scale-[.98] " +
        (loading ? "opacity-70 cursor-wait " : "hover:shadow-[0_18px_40px_rgba(120,129,250,0.28)] ") +
        "shadow-[0_12px_28px_rgba(120,129,250,0.18)] bg-gradient-to-r from-indigo-200 via-sky-200 to-teal-200 " +
        className
      }
      {...rest}
      disabled={loading || rest.disabled}
    >
      {loading ? "처리 중..." : children}
    </button>
  );
}
