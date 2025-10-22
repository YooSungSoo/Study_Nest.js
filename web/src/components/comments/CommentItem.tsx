import type { Comment } from "../../types/post";

function InitialAvatar({ name }: { name: string }) {
  const initial = (name?.[0] ?? "?").toUpperCase();
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 via-sky-100 to-white text-indigo-600 text-sm font-semibold shadow-sm select-none">
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
    <div className="group relative rounded-2xl border border-white/60 bg-white/90 backdrop-blur p-4 shadow-[0_18px_38px_rgba(105,122,214,0.12)] transition hover:shadow-[0_22px_48px_rgba(105,122,214,0.18)]">
      {/* 헤더 */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <InitialAvatar name={item.author} />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-700">{item.author}</div>
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
            className="rounded-xl border border-rose-100 bg-rose-50/80 px-3 py-1.5 text-rose-500 shadow-sm outline-none transition hover:bg-rose-100 hover:text-rose-600 focus-visible:ring-2 focus-visible:ring-rose-200 disabled:opacity-60"
          >
            {/* 간단한 아이콘(이모지) – 라이브러리 없이 사용 */}
            {isDeleting ? "…" : "🗑️"}
          </button>
        )}
      </div>

      {/* 본문 */}
      <div className="mt-3 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate-700">
        {item.content}
      </div>
    </div>
  );
}
