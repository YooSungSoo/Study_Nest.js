// src/components/ui/Label.tsx
export default function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-sm font-semibold text-slate-600">
      {children}
    </label>
  );
}
