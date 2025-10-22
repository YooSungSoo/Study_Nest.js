// web/src/services/post.service.ts
import { apiFetch } from "../config/api";

export async function list(page: number, pageSize: number) {
  const res = await apiFetch(`/posts?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error('목록 조회 실패');
  return res.json(); // { items, total }
}

export async function get(id: string) {
  const res = await apiFetch(`/posts/${id}`);
  if (!res.ok) throw new Error('상세 조회 실패');
  return res.json(); // { id, title, content, ... }
}

export async function create(draft: { title: string; content: string; tags: string[] }, userName: string) {
  const res = await apiFetch(`/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-user-name': userName },
    body: JSON.stringify(draft),
  });
  if (!res.ok) throw new Error('작성 실패');
  return res.json(); // { id }
}

export async function update(id: string, draft: { title?: string; content?: string; tags?: string[] }, userName: string) {
  const res = await apiFetch(`/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'x-user-name': userName },
    body: JSON.stringify(draft),
  });
  if (!res.ok) throw new Error('수정 실패');
  return res.json();
}

export async function remove(id: string, userName: string) {
  const res = await apiFetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: { 'x-user-name': userName },
  });
  if (!res.ok) throw new Error('삭제 실패');
}

export async function listComments(postId: string) {
  const res = await apiFetch(`/posts/${postId}/comments`);
  if (!res.ok) throw new Error('댓글 목록 실패');
  return res.json(); // Comment[]
}

export async function createComment(postId: string, content: string, userName: string) {
  const res = await apiFetch(`/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-user-name': userName },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('댓글 작성 실패');
  return res.json();
}

export async function removeComment(postId: string, commentId: string, userName: string) {
  const res = await apiFetch(`/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: { 'x-user-name': userName },
  });
  if (!res.ok) throw new Error('댓글 삭제 실패');
}
