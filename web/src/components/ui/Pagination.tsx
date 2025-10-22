// src/components/ui/Pagination.tsx
export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;           // 1부터 시작
  pageSize: number;
  total: number;
  onPageChange: (next: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // 간단한 1~N 페이지 버튼 (N이 작다는 가정)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2 text-sm">
      <button
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        className="rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-500 shadow-sm transition hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
      >
        이전
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`rounded-xl border px-3 py-2 transition ${
            p === page
              ? "border-indigo-200 bg-indigo-100 text-indigo-600 shadow"
              : "border-white/60 bg-white/90 text-slate-500 shadow-sm hover:shadow"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        className="rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-500 shadow-sm transition hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
}
