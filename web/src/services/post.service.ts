// src/services/post.service.ts
import type { Post, PostDraft, PostSummary, Comment } from "../types/post";
import { currentUser } from "./auth.mock";

let POSTS: Post[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  title: `샘플 게시글 ${i + 1}`,
  content:
    "이것은 샘플 본문입니다. 실제 API 연결 시 서버에서 내려오는 내용을 보여줍니다.\n\n- 목업 데이터\n- 댓글 테스트\n- 스타일 확인",
  author: i % 3 === 0 ? "Soo" : i % 3 === 1 ? "Alice" : "Bob",
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  tags: i % 2 ? ["React", "Nest.js"] : ["TypeScript"],
}));

let COMMENTS: Record<string, Comment[]> = Object.fromEntries(
  POSTS.map((p, i) => [
    p.id,
    Array.from({ length: i % 5 }, (_, k) => ({
      id: `${p.id}-${k + 1}`,
      author: k % 2 ? "Alice" : "Bob",
      content: `샘플 댓글 ${k + 1} (게시글 ${p.id})`,
      createdAt: new Date(Date.now() - (k + 1) * 3600000).toISOString(),
    })),
  ])
);

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function list(page: number, pageSize: number): Promise<{ items: PostSummary[]; total: number }> {
  await delay();
  const total = POSTS.length;
  const start = (page - 1) * pageSize;
  const slice = POSTS.slice(start, start + pageSize);
  const items: PostSummary[] = slice.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.content.slice(0, 80),
    author: p.author,
    createdAt: p.createdAt,
    commentCount: COMMENTS[p.id]?.length ?? 0,
    tags: p.tags,
  }));
  return { items, total };
}

export async function get(id: string): Promise<Post> {
  await delay();
  const found = POSTS.find((p) => p.id === id);
  if (!found) throw new Error("게시글을 찾을 수 없습니다");
  return found;
}

export async function create(draft: PostDraft): Promise<{ id: string }> {
  await delay(400);
  const id = String(POSTS.length + 1);
  POSTS.unshift({
    id,
    title: draft.title,
    content: draft.content,
     author: currentUser.name,
    createdAt: new Date().toISOString(),
    tags: draft.tags,
  });
  COMMENTS[id] = [];
  return { id };
}

export async function listComments(postId: string): Promise<Comment[]> {
  await delay(200);
  return (COMMENTS[postId] ?? []).slice().sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function createComment(postId: string, content: string): Promise<Comment> {
  await delay(250);
  const newC: Comment = {
    id: `${postId}-${Date.now()}`,
     author: currentUser.name, 
    content,
    createdAt: new Date().toISOString(),
  };
  COMMENTS[postId] = [...(COMMENTS[postId] ?? []), newC];
  return newC;

}


export async function update(id: string, draft: PostDraft): Promise<Post> {
  await delay(400);
  const idx = POSTS.findIndex((p) => p.id === id);
  if (idx < 0) throw new Error("게시글을 찾을 수 없습니다");
  const prev = POSTS[idx];

    if (prev.author !== currentUser.name) {
    throw new Error("수정 권한이 없습니다.");
  }

  const updated: Post = {
    ...prev,
    title: draft.title,
    content: draft.content,
    tags: draft.tags,
    // 수정 시간을 별도로 관리하고 싶다면 필드를 추가하세요(예: updatedAt)
  };
  POSTS[idx] = updated;
  return updated;
}

export async function remove(id: string): Promise<void> {
  await delay(300);
  const idx = POSTS.findIndex((p) => p.id === id);
  if (idx < 0) throw new Error("게시글을 찾을 수 없습니다");

   if (POSTS[idx].author !== currentUser.name) {
    throw new Error("삭제 권한이 없습니다.");
  }
  POSTS.splice(idx, 1);         // 게시글 삭제
  delete COMMENTS[id];          // 해당 게시글의 댓글도 정리 (목업 기준)
}

export async function removeComment(postId: string, commentId: string): Promise<void> {
  await delay(200);
  const list = COMMENTS[postId] ?? [];
  const idx = list.findIndex((c) => c.id === commentId);
  if (idx < 0) throw new Error("댓글을 찾을 수 없습니다");
    if (list[idx].author !== currentUser.name) {
    throw new Error("댓글 삭제 권한이 없습니다.");
  }
  list.splice(idx, 1);
  COMMENTS[postId] = list;
}