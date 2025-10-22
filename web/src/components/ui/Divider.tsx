// src/components/ui/Divider.tsx
export default function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex items-center gap-3 text-slate-400">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />
      <span className="text-xs font-medium text-slate-500">{children}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />
    </div>
  );
}
