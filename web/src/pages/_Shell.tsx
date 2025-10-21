export default function Shell({
  title, subtitle, children, footer,
}: {
  title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl shadow-md p-8 bg-white/80 backdrop-blur">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
            {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
          </div>
          {children}
        </div>
        {footer && <div className="mt-4 text-center text-sm text-slate-600">{footer}</div>}
      </div>
    </div>
  );
}
