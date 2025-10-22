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
    
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        // ⬇️ 템플릿 문자열 안에서 직접 분기 (Tailwind가 확실히 인식)
        className={`mx-auto w-full ${
          size === "xl"   ? "max-w-5xl"
        : size === "wide" ? "max-w-4xl"
                          : "max-w-md"
        }`}
      >
        <div className="rounded-3xl shadow-md p-8 bg-white/80 backdrop-blur">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">{title}</h1>
            {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
          </div>
          {children}
        </div>
        {footer && <div className="mt-4 text-center text-sm text-slate-600">{footer}</div>}
      </div>
    </div>
  );
}
