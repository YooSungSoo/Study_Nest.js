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
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        className="px-3 py-2 rounded-xl border border-slate-200 bg-white/80 disabled:opacity-50"
      >
        이전
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-2 rounded-xl border ${
            p === page
              ? "border-violet-300 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-white/80 hover:shadow-sm"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        className="px-3 py-2 rounded-xl border border-slate-200 bg-white/80 disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
}
