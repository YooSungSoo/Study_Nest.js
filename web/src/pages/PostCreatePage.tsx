// src/pages/PostCreatePage.tsx
import Shell from "./_Shell";
import PostForm from "../components/posts/PostForm";
import type { PostDraft } from "../types/post";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PostCreatePage() {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function createPost(draft: PostDraft) {
    // TODO: 실제 API로 교체
    // 예: await postService.create(draft)
    await new Promise((r) => setTimeout(r, 700));
    alert(`작성 완료!\n제목: ${draft.title}\n태그: ${draft.tags.join(", ")}`);
    nav("/"); // 작성 후 메인(목록)으로 이동
  }

  return (
    <Shell
     size="xl"
      title="게시물 작성"
      subtitle="새 글을 작성해 보세요"
    >
      <PostForm onSubmit={async (d) => {
        try {
          setSubmitting(true);
          await createPost(d);
        } finally {
          setSubmitting(false);
        }
      }} submitting={submitting} />
    </Shell>
  );
}
