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
        <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-700">
          {error}
        </div>
      ) : null}

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
    </Shell>
  );
}
