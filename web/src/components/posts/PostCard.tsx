// src/components/posts/PostCard.tsx
import type { PostSummary } from "../../types/post";

export default function PostCard({ post, onClickTitle }: {
  post: PostSummary;
  onClickTitle?: (id: string) => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-white/60 bg-white/90 p-6 shadow-[0_22px_46px_rgba(108,124,214,0.14)] backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(108,124,214,0.2)]">
      <div className="pointer-events-none absolute -top-16 right-[-20px] h-36 w-36 rounded-full bg-gradient-to-br from-indigo-100 via-sky-100 to-transparent opacity-70 transition duration-200 group-hover:scale-110" />

      <header className="relative flex items-start justify-between gap-3">
        <h3
          className="cursor-pointer text-base font-semibold text-slate-800 transition-colors duration-150 group-hover:text-indigo-500 sm:text-lg"
          onClick={() => onClickTitle?.(post.id)}
          title={post.title}
        >
          {post.title}
        </h3>
        <span className="whitespace-nowrap text-xs text-slate-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </header>

      <p className="relative mt-3 line-clamp-2 text-sm text-slate-600">
        {post.excerpt}
      </p>

      <footer className="relative mt-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2 text-slate-500">
          <span>by {post.author}</span>
          {post.tags?.length ? (
            <span className="hidden sm:inline">
              • {post.tags.slice(0, 2).join(", ")}
              {post.tags.length > 2 ? "…" : ""}
            </span>
          ) : null}
        </div>
        <div className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-500 shadow-sm">
          댓글 {post.commentCount}
        </div>
      </footer>
    </article>
  );
}
