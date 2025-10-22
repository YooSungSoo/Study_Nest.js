// src/components/ui/Textarea.tsx
import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string };

export default function Textarea({ error, className = "", ...rest }: Props) {
  return (
    <div>
      <textarea
        className={
          "w-full rounded-2xl border px-4 py-3 outline-none transition min-h-[160px] " +
          (error
            ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 "
            : "border-slate-200 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 ") +
          className
        }
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
