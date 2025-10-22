// src/components/posts/PostList.tsx
import PostCard from "./PostCard";
import type { PostSummary } from "../../types/post";

export default function PostList({
  items,
  isLoading,
  emptyText = "게시글이 없습니다.",
  onClickTitle,
}: {
  items: PostSummary[];
  isLoading?: boolean;
  emptyText?: string;
  onClickTitle?: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6 text-center shadow-[0_20px_40px_rgba(108,124,214,0.12)] backdrop-blur">
        <p className="text-sm text-slate-500">목록을 불러오는 중…</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6 text-center shadow-[0_20px_40px_rgba(108,124,214,0.12)] backdrop-blur">
        <p className="text-sm text-slate-500">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <PostCard key={p.id} post={p} onClickTitle={onClickTitle} />
      ))}
    </div>
  );
}
