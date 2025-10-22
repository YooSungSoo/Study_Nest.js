import { useMemo, useState } from "react";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

const MAX = 500;

export default function CommentForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (content: string) => Promise<void> | void;
  submitting?: boolean;
}) {
  const [content, setContent] = useState("");
  const left = useMemo(() => Math.max(0, MAX - content.length), [content]);
  const canSubmit = content.trim().length > 0 && content.length <= MAX;

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit(content.trim());
    setContent("");
  }

  return (
    <form
      onSubmit={handle}
      className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 shadow-sm"
    >
      <Textarea
        placeholder="따뜻한 댓글을 남겨주세요 (최대 500자)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={MAX}
        className="min-h-[120px]"
      />

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          남은 글자 수: <span className={left < 50 ? "text-rose-500" : ""}>{left}</span>
        </span>
        <div className="w-28">
          <Button type="submit" loading={submitting} disabled={!canSubmit}>
            등록
          </Button>
        </div>
      </div>
    </form>
  );
}
