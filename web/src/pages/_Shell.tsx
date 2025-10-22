// src/pages/_Shell.tsx
export default function Shell({
  title,
  subtitle,
  children,
  footer,
  size = "narrow", // "narrow" | "wide" | "xl"
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "narrow" | "wide" | "xl";
}) {
  return (
    <div className="min-h-screen w-full px-4 py-16 sm:px-6 lg:px-8">
      <div
        className={`mx-auto w-full ${
          size === "xl"
            ? "max-w-5xl"
            : size === "wide"
              ? "max-w-4xl"
              : "max-w-md"
        }`}
      >
        <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/90 shadow-[0_28px_60px_rgba(94,112,214,0.18)] backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-40 right-[-60px] h-72 w-72 rounded-full bg-gradient-to-br from-indigo-100 via-purple-100 to-transparent opacity-70" />
          <div className="pointer-events-none absolute -bottom-32 left-[-40px] h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-100 via-teal-100 to-transparent opacity-60" />

          <div className="relative p-8 sm:p-10">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
              {subtitle && <p className="mt-2 text-base text-slate-500">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
        {footer && <div className="mt-4 text-center text-sm text-slate-500">{footer}</div>}
      </div>
    </div>
  );
}
