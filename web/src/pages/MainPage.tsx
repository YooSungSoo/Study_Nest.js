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
      <header className="mx-auto max-w-5xl mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
            Jungle Project <span className="text-violet-600">Main</span>
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => nav("/posts/new")}
              className="rounded-2xl px-4 py-2 text-sm text-white bg-gradient-to-r from-violet-400 to-indigo-400 shadow-sm active:scale-[.99]"
            >
              글쓰기
            </button>
            <button
              onClick={() => nav("/signin")}
              className="rounded-2xl px-4 py-2 text-sm text-slate-700 bg-white/80 backdrop-blur border border-slate-200 hover:shadow-sm"
              title="임시 로그아웃 (세션/토큰 로직 연결 전)"
            >
              로그아웃
            </button>
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
        <div className="mx-auto max-w-5xl mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-700">
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
