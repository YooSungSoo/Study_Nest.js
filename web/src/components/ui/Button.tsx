// src/components/ui/Button.tsx
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export default function Button({ loading, className = "", children, ...rest }: Props) {
  return (
    <button
      className={
        "w-full rounded-2xl px-4 py-3 text-white shadow-sm transition active:scale-[.99] " +
        (loading ? "opacity-80 cursor-wait " : "hover:shadow-md ") +
        "bg-gradient-to-r from-violet-400 to-indigo-400 " +
        className
      }
      {...rest}
      disabled={loading || rest.disabled}
    >
      {loading ? "처리 중..." : children}
    </button>
  );
}
