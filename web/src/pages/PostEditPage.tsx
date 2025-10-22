// src/pages/PostEditPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Shell from "./_Shell";
import PostForm from "../components/posts/PostForm";
import type { Post, PostDraft } from "../types/post";
import * as postService from "../services/post.service";
import { currentUser } from "../services/auth.mock"; // ✅ 임시 사용자명

export default function PostEditPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 기존 글 로드
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const p = await postService.get(id);
        if (mounted) setPost(p);
      } catch (e) {
        if (mounted) setError((e as Error).message ?? "상세 조회 실패");
      } finally {
        if (mounted) setLoading(false);
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
      setError(null);
      // ✅ 사용자명 함께 전달 (서버에서 작성자 검증)
      await postService.update(
        id,
        { title: draft.title, content: draft.content, tags: draft.tags ?? [] },
        currentUser.name
      );
      nav(`/posts/${id}`); // 저장 후 상세로 이동
    } catch (e) {
      setError((e as Error).message ?? "수정 실패");
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
    <Shell size="xl" title="게시물 수정" subtitle={post ? `현재 제목: ${post.title}` : undefined}>
      {error ? (
        <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-6">
          <p className="text-sm text-slate-500">기존 내용을 불러오는 중…</p>
        </div>
      ) : post ? (
        <PostForm
          initial={{ title: post.title, content: post.content, tags: post.tags ?? [] }}
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
