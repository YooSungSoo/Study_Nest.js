// src/components/ui/Label.tsx
export default function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">{children}</label>;
}
