// src/components/auth/AuthForm.tsx
import { useMemo, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Label from "../ui/Label";
import Divider from "../ui/Divider";

type Mode = "signin" | "signup";
const emailRe = /\S+@\S+\.\S+/;

export type SignInValues = { email: string; password: string };
export type SignUpValues = { email: string; password: string; nickname?: string };

export default function AuthForm({
  mode,
  onSubmit,
}: {
  mode: Mode;
  onSubmit: (v: SignInValues | SignUpValues) => Promise<void> | void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; nickname?: string }>({});
  const [loading, setLoading] = useState(false);

  const values = useMemo(() => ({ email, password, nickname }), [email, password, nickname]);

  const validate = () => {
    const next: typeof errors = {};
    if (!emailRe.test(email)) next.email = "이메일 형식을 확인해 주세요";
    if (password.length < 4) next.password = "비밀번호는 4자 이상";
    if (mode === "signup" && nickname.trim().length < 2) next.nickname = "닉네임은 2자 이상";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            placeholder="예) Soo"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={errors.nickname}
            autoComplete="nickname"
          />
        </div>
      )}

      <div>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="password">비밀번호</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPw ? "text" : "password"}
            placeholder="4자 이상 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="pr-24"
          />
          <button
            type="button"
            onClick={() => setShowPw((prev) => !prev)}
            className="absolute inset-y-2 right-2 flex items-center rounded-xl border border-white/60 bg-white/90 px-3 text-xs font-semibold text-slate-500 shadow-sm transition hover:text-indigo-500"
          >
            {showPw ? "숨기기" : "보기"}
          </button>
        </div>
      </div>

      {mode === "signin" && (
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 select-none">
            <input type="checkbox" className="accent-indigo-400" />
            <span className="text-slate-600">자동 로그인</span>
          </label>
          <button type="button" className="text-indigo-500 hover:underline">비밀번호 찾기</button>
        </div>
      )}

      <Button type="submit" loading={loading}>
        {mode === "signin" ? "로그인" : "회원가입"}
      </Button>

      <Divider>또는</Divider>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <button
          type="button"
          className="rounded-xl border border-transparent bg-gradient-to-r from-rose-200 to-rose-300 px-2 py-2 font-medium text-rose-700 shadow-sm transition hover:shadow"
        >
          Google
        </button>
        <button
          type="button"
          className="rounded-xl border border-transparent bg-slate-200 px-2 py-2 font-medium text-slate-700 shadow-sm transition hover:shadow"
        >
          GitHub
        </button>
        <button
          type="button"
          className="rounded-xl border border-transparent bg-amber-200 px-2 py-2 font-medium text-amber-700 shadow-sm transition hover:shadow"
        >
          Kakao
        </button>
      </div>
    </form>
  );
}
