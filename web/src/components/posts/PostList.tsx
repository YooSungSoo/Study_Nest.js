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
      <div className="rounded-3xl p-6 bg-white/70 backdrop-blur border border-slate-200">
        <p className="text-slate-500 text-sm">목록을 불러오는 중…</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl p-6 bg-white/70 backdrop-blur border border-slate-200">
        <p className="text-slate-500 text-sm">{emptyText}</p>
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
