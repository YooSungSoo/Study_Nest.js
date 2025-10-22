// src/components/posts/PostForm.tsx
import { useMemo, useState } from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Label from "../ui/Label";
import Button from "../ui/Button";
import type { PostDraft } from "../../types/post";

export default function PostForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Partial<PostDraft>;
  onSubmit: (draft: PostDraft) => Promise<void> | void;
  submitting?: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(", "));
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const draft = useMemo<PostDraft>(() => {
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    return { title, content, tags };
  }, [title, content, tagsText]);

  const validate = () => {
    const next: typeof errors = {};
    if (!title.trim()) next.title = "제목을 입력해 주세요";
    if (!content.trim()) next.content = "본문을 입력해 주세요";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(draft);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />
      </div>

      <div>
        <Label htmlFor="content">본문</Label>
        <Textarea
          id="content"
          placeholder="내용을 작성하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          error={errors.content}
        />
      </div>

      <div>
        <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
        <Input
          id="tags"
          placeholder="예) React, TypeScript"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
        />
      </div>

      <Button type="submit" loading={submitting}>작성하기</Button>
    </form>
  );
}
