// src/types/post.ts
export type PostSummary = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;      // ISO 문자열
  commentCount: number;
  tags?: string[];
};

export type PostDraft = {
  title: string;
  content: string;
  tags: string[]; // 쉼표 입력을 배열로 변환
};


export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags?: string[];
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};