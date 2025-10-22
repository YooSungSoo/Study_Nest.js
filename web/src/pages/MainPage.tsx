// src/pages/MainPage.tsx
import { useEffect, useMemo, useState } from "react";
import PostList from "../components/posts/PostList";
import Pagination from "../components/ui/Pagination";
import type { PostSummary } from "../types/post";
import { useNavigate } from "react-router-dom";
import * as postService from "../services/post.service";

export default function MainPage() {
  const nav = useNavigate();

  // 페이지 상태
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // 데이터 상태
  const [items, setItems] = useState<PostSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 페이지 변경 시 실제 API 호출
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { items, total } = await postService.list(page, pageSize);
        if (!mounted) return;
        setItems(items);
        setTotal(total);
      } catch (e) {
        if (!mounted) return;
        setError((e as Error).message ?? "목록 조회 실패");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [page]);

  const header = useMemo(
    () => (
      <header className="mx-auto mb-8 max-w-5xl">
        <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/90 px-6 py-8 shadow-[0_26px_52px_rgba(104,120,214,0.16)] backdrop-blur">
          <div className="pointer-events-none absolute -top-24 left-[-40px] h-48 w-48 rounded-full bg-gradient-to-br from-teal-100 via-emerald-100 to-transparent opacity-50" />
          <div className="pointer-events-none absolute -bottom-32 right-[-60px] h-64 w-64 rounded-full bg-gradient-to-br from-indigo-100 via-sky-100 to-transparent opacity-60" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Jungle Project</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                먹고싶은 메뉴 기록 공간
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                정글 끝나면 진짜 다 먹는다..
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => nav("/posts/new")}
                className="rounded-2xl bg-gradient-to-r from-indigo-200 via-sky-200 to-teal-200 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-[0_16px_32px_rgba(112,129,245,0.28)] transition active:scale-[.97]"
              >
                새 글 작성
              </button>
              <button
                onClick={() => nav("/signin")}
                className="rounded-2xl border border-white/60 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-500 shadow-sm transition hover:shadow"
                title="임시 로그아웃 (세션/토큰 로직 연결 전)"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
    ),
    [nav]
  );

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      {header}

      {/* 에러 배너 */}
      {error ? (
        <div className="mx-auto mb-6 max-w-5xl rounded-2xl border border-rose-100 bg-rose-50/80 p-4 text-sm text-rose-600 shadow-[0_12px_26px_rgba(244,114,182,0.18)]">
          {error}
        </div>
      ) : null}

      {/* 목록 */}
      <main className="mx-auto max-w-5xl">
        <PostList
          items={items}
          isLoading={loading}
          onClickTitle={(id) => nav(`/posts/${id}`)}
        />

        {/* 페이징 */}
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
