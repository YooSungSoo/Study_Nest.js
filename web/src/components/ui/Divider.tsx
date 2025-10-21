// src/components/ui/Divider.tsx
export default function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-slate-400 my-4">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs">{children}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
