// src/components/ui/Input.tsx
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

export default function Input({ error, className = "", ...rest }: Props) {
  return (
    <div>
      <input
        className={
          "w-full rounded-2xl border px-4 py-3 outline-none transition bg-white/90 shadow-[0_4px_16px_rgba(140,152,235,0.12)] " +
          (error
            ? "border-rose-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 "
            : "border-white/60 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 ") +
          className
        }
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
