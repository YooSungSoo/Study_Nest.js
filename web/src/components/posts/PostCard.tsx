// src/components/posts/PostCard.tsx
import type { PostSummary } from "../../types/post";

export default function PostCard({ post, onClickTitle }: {
  post: PostSummary;
  onClickTitle?: (id: string) => void;
}) {
  return (
    <article className="rounded-3xl p-5 bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:shadow-md transition">
      <header className="flex items-start justify-between gap-3">
        <h3
          className="text-base sm:text-lg font-semibold text-slate-800 hover:text-violet-600 cursor-pointer"
          onClick={() => onClickTitle?.(post.id)}
          title={post.title}
        >
          {post.title}
        </h3>
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </header>

      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>

      <footer className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>by {post.author}</span>
          {post.tags?.length ? (
            <span className="hidden sm:inline">
              • {post.tags.slice(0, 2).join(", ")}
              {post.tags.length > 2 ? "…" : ""}
            </span>
          ) : null}
        </div>
        <div>댓글 {post.commentCount}</div>
      </footer>
    </article>
  );
}
