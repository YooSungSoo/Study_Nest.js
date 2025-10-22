// src/pages/MainPage.tsx
import { useEffect, useMemo, useState } from "react";
import PostList from "../components/posts/PostList";
import Pagination from "../components/ui/Pagination";
import type { PostSummary } from "../types/post";
import { useNavigate } from "react-router-dom";

// (임시) 목업 데이터 생성
function makeMockPosts(total = 23): PostSummary[] {
  return Array.from({ length: total }, (_, i) => {
    const id = String(i + 1);
    return {
      id,
      title: `샘플 게시글 ${id}`,
      excerpt: "이것은 샘플 게시글의 요약입니다. 실제 API 연결 시 서버에서 내려오는 내용을 보여줍니다.",
      author: i % 3 === 0 ? "Soo" : i % 3 === 1 ? "Alice" : "Bob",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      commentCount: Math.floor(Math.random() * 20),
      tags: i % 2 ? ["React", "Nest.js"] : ["TypeScript"],
    };
  });
}

// (임시) 서버 흉내: 페이지네이션 처리
async function fetchMockPostPage(page: number, pageSize: number) {
  const all = makeMockPosts();
  const start = (page - 1) * pageSize;
  const items = all.slice(start, start + pageSize);
  // 지연 흉내
  await new Promise((r) => setTimeout(r, 300));
  return { items, total: all.length };
}

export default function MainPage() {
  const nav = useNavigate();

  // 페이지 상태
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // 데이터 상태
  const [items, setItems] = useState<PostSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchMockPostPage(page, pageSize).then(({ items, total }) => {
      if (!mounted) return;
      setItems(items);
      setTotal(total);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [page]);

  const header = useMemo(() => (
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
  ), [nav]);

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      {header}

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
