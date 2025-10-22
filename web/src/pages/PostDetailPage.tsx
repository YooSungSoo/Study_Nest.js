// src/pages/PostDetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentUser } from "../services/auth.mock";

import Shell from "./_Shell";
import * as postService from "../services/post.service";
import type { Post, Comment } from "../types/post";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";

export default function PostDetailPage() {
  const { id } = useParams(); // id: string | undefined
  const nav = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false); // 게시글 삭제
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null); // 댓글 삭제

  // 댓글 작성 (✅ 사용자명 전달)
  async function handleCreateComment(content: string) {
    if (!id) return;
    try {
      setSubmitting(true);
      const newC = await postService.createComment(id, content, currentUser.name);
      setComments((prev) => [...prev, newC]);
    } finally {
      setSubmitting(false);
    }
  }

  // 댓글 삭제 (✅ 사용자명 전달)
  async function handleDeleteComment(commentId: string) {
    if (!id) return;
    const ok = window.confirm("이 댓글을 삭제하시겠습니까?");
    if (!ok) return;
    try {
      setDeletingCommentId(commentId);
      await postService.removeComment(id, commentId, currentUser.name);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (e) {
      alert((e as Error).message || "댓글 삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingCommentId(null);
    }
  }

  // 게시글 삭제 (✅ 사용자명 전달)
  async function handleDelete() {
    if (!id) return;
    const ok = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!ok) return;
    try {
      setDeleting(true);
      await postService.remove(id, currentUser.name);
      alert("삭제되었습니다.");
      nav("/"); // 메인(목록)으로 이동
    } catch (e) {
      alert((e as Error).message || "삭제 중 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  }

  // 게시글/댓글 로드
  useEffect(() => {
    if (!id) return;
    const postId = id;

    let mounted = true;

    async function loadPost() {
      try {
        setLoadingPost(true);
        const p = await postService.get(postId);
        if (mounted) setPost(p);
      } finally {
        setLoadingPost(false);
      }
    }

    async function loadComments() {
      try {
        setLoadingComments(true);
        const cs = await postService.listComments(postId);
        if (mounted) setComments(cs);
      } finally {
        setLoadingComments(false);
      }
    }

    loadPost();
    loadComments();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!id) {
    return (
      <Shell title="게시글" subtitle="잘못된 경로입니다.">
        <div className="rounded-2xl border border-white/60 bg-white/90 p-4 text-center shadow-[0_16px_32px_rgba(122,132,214,0.14)]">
          <button onClick={() => nav("/")} className="text-indigo-500 hover:underline">
            메인으로
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell
      size="xl"
      title={loadingPost ? "불러오는 중…" : post?.title ?? "글을 찾을 수 없습니다"}
      subtitle={!loadingPost ? `작성자: ${post?.author ?? "-"}` : undefined}
    >
      {/* 본문 */}
      <article className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_26px_52px_rgba(104,120,214,0.16)] backdrop-blur">
        <div className="pointer-events-none absolute -top-32 right-[-40px] h-64 w-64 rounded-full bg-gradient-to-br from-indigo-100 via-sky-100 to-transparent opacity-60" />
        {loadingPost ? (
          <p className="relative text-sm text-slate-500">본문을 불러오는 중…</p>
        ) : post ? (
          <div className="relative space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <time>{new Date(post.createdAt).toLocaleString()}</time>
              {post.tags?.length ? <span>태그: {post.tags.join(", ")}</span> : null}
            </div>
            <div className="whitespace-pre-wrap rounded-2xl bg-white/60 p-4 leading-relaxed text-slate-700 shadow-inner">
              {post.content}
            </div>
          </div>
        ) : (
          <div className="relative text-sm text-rose-500">게시글이 존재하지 않습니다.</div>
        )}
      </article>

      {/* 댓글 목록 */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-slate-700">댓글</h3>
        <div className="mt-2">
          <CommentList
            items={comments}
            isLoading={loadingComments}
            onDelete={handleDeleteComment}
            deletingId={deletingCommentId}
            canDelete={true} // 서버에서 최종 권한 검증, UI는 일단 노출
          />
        </div>
      </div>

      {/* 댓글 작성 */}
      <div className="mt-4 rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_18px_34px_rgba(122,132,214,0.14)] backdrop-blur">
        <CommentForm onSubmit={handleCreateComment} submitting={submitting} />
      </div>

      {/* 하단 네비 */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
        <button onClick={() => nav(-1)} className="text-slate-500 transition hover:text-indigo-500">
          ← 뒤로가기
        </button>

        <div className="flex items-center gap-3">
          {/* 작성자만 수정/삭제 노출 */}
          {post?.author === currentUser.name && (
            <>
              <button
                onClick={() => nav(`/posts/${id}/edit`)}
                className="text-slate-500 transition hover:text-indigo-500"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-2xl bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition active:scale-[.98] disabled:opacity-60"
                title="게시글 삭제"
              >
                {deleting ? "삭제 중…" : "삭제"}
              </button>
            </>
          )}

          <button onClick={() => nav("/")} className="text-indigo-500 hover:underline">
            메인으로
          </button>
        </div>
      </div>
    </Shell>
  );
}
