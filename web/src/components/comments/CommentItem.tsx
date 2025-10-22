import type { Comment } from "../../types/post";

function InitialAvatar({ name }: { name: string }) {
  const initial = (name?.[0] ?? "?").toUpperCase();
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-sm font-semibold select-none">
      {initial}
    </div>
  );
}

export default function CommentItem({
  item,
  onDelete,
  isDeleting,
  canDelete = true,
}: {
  item: Comment;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  canDelete?: boolean;
}) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 shadow-sm transition hover:shadow-md">
      {/* 헤더 */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <InitialAvatar name={item.author} />
          <div className="leading-tight">
            <div className="text-sm font-medium text-slate-800">{item.author}</div>
            <time className="text-xs text-slate-500">
              {new Date(item.createdAt).toLocaleString()}
            </time>
          </div>
        </div>

        {/* 삭제 버튼: 아이콘 스타일 */}
        {canDelete && onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            disabled={isDeleting}
            title="댓글 삭제"
            aria-label="댓글 삭제"
            className="rounded-lg border border-rose-200 bg-white p-2 text-rose-600/90 shadow-sm outline-none transition hover:bg-rose-50 hover:text-rose-700 focus-visible:ring-2 focus-visible:ring-rose-200 disabled:opacity-60"
          >
            {/* 간단한 아이콘(이모지) – 라이브러리 없이 사용 */}
            {isDeleting ? "…" : "🗑️"}
          </button>
        )}
      </div>

      {/* 본문 */}
      <div className="mt-3 text-[15px] leading-relaxed text-slate-800 whitespace-pre-wrap break-words">
        {item.content}
      </div>
    </div>
  );
}
