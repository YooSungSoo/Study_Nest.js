// src/pages/PostCreatePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shell from "./_Shell";
import PostForm from "../components/posts/PostForm";
import type { PostDraft } from "../types/post";
import * as postService from "../services/post.service";
import { currentUser } from "../services/auth.mock";

export default function PostCreatePage() {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createPost(draft: PostDraft) {
    setError(null);
    // API: POST /posts  (작성자 임시: currentUser.name을 x-user-name으로 전달)
    const { id } = await postService.create(
      {
        title: draft.title,
        content: draft.content,
        tags: draft.tags ?? [],
      },
      currentUser.name
    );
    // 작성 직후 상세 페이지로 이동
    nav(`/posts/${id}`);
  }

  return (
    <Shell size="xl" title="게시물 작성" subtitle="새 글을 작성해 보세요">
      {error ? (
        <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50/80 p-4 text-sm text-rose-600 shadow-[0_12px_24px_rgba(244,114,182,0.18)]">
          {error}
        </div>
      ) : null}

      <div className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_24px_48px_rgba(108,124,214,0.14)] backdrop-blur">
        <PostForm
          onSubmit={async (d) => {
            try {
              setSubmitting(true);
              await createPost(d);
            } catch (e) {
              setError((e as Error).message ?? "작성 실패");
            } finally {
              setSubmitting(false);
            }
          }}
          submitting={submitting}
        />
      </div>
    </Shell>
  );
}
