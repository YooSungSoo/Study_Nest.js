import type { Comment } from "../../types/post";
import CommentItem from "./CommentItem";

export default function CommentList({
  items,
  isLoading,
  emptyText = "아직 댓글이 없습니다.",
  onDelete,
  deletingId,
  canDelete = true,
  canDeleteFor,
}: {
  items: Comment[];
  isLoading?: boolean;
  emptyText?: string;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  canDelete?: boolean;
  canDeleteFor?: (c: Comment) => boolean;
}) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/60 bg-white/90 backdrop-blur p-4 shadow-[0_16px_32px_rgba(122,132,214,0.12)]">
        <p className="text-sm text-slate-500">댓글을 불러오는 중…</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/60 bg-white/90 backdrop-blur p-6 text-center shadow-[0_16px_32px_rgba(122,132,214,0.12)]">
        <p className="text-sm text-slate-500">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((c) => (
        <CommentItem
          key={c.id}
          item={c}
          onDelete={onDelete}
          isDeleting={deletingId === c.id}
           canDelete={canDeleteFor ? canDeleteFor(c) : canDelete}
        />
      ))}
    </div>
  );
}
