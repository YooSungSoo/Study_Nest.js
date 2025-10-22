// src/pages/PostEditPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Shell from "./_Shell";
import PostForm from "../components/posts/PostForm";
import type { Post, PostDraft } from "../types/post";
import * as postService from "../services/post.service";

export default function PostEditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 기존 글 로드
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const p = await postService.get(id);
        if (mounted) setPost(p);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleUpdate(draft: PostDraft) {
    if (!id) return;
    try {
      setSubmitting(true);
      await postService.update(id, draft);
      // 저장 후 상세로 이동
      nav(`/posts/${id}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (!id) {
    return (
      <Shell title="수정" subtitle="잘못된 경로입니다.">
        <button onClick={() => nav("/")} className="text-violet-600 underline">메인으로</button>
      </Shell>
    );
  }

  return (
    <Shell
      size="xl"
      title="게시물 수정"
      subtitle={post ? `현재 제목: ${post.title}` : undefined}
    >
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-6">
          <p className="text-sm text-slate-500">기존 내용을 불러오는 중…</p>
        </div>
      ) : post ? (
        <PostForm
          initial={{
            title: post.title,
            content: post.content,
            tags: post.tags ?? [],
          }}
          submitting={submitting}
          onSubmit={handleUpdate}
        />
      ) : (
        <div className="text-sm text-rose-600">게시글을 찾을 수 없습니다.</div>
      )}

      {/* 하단 네비(선택) */}
      <div className="mt-6 flex justify-between">
        <button onClick={() => nav(-1)} className="text-slate-600 hover:underline">← 뒤로가기</button>
        <button onClick={() => nav(`/posts/${id}`)} className="text-violet-600 hover:underline">상세로</button>
      </div>
    </Shell>
  );
}
