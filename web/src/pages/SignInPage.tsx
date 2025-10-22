// src/pages/SignInPage.tsx
import AuthForm from "../components/auth/AuthForm";
import type { SignInValues } from "../components/auth/AuthForm";
import Shell from "./_Shell";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function SignInPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const { signIn } = useAuth();

  // 보호 라우트가 넘겨준 복귀 목적지 (없으면 "/")
  const from = (loc.state as any)?.from?.pathname || "/";

  const handleSignIn = async (v: SignInValues) => {
    try {
      await signIn(v.email, v.password);   // ✅ 전역 로그인
      nav(from, { replace: true });        // ✅ 원래 가려던 곳 or 메인으로
    } catch (e) {
      alert("로그인 실패. 다시 시도해 주세요.");
    }
  };

  return (
    <Shell
      title="로그인"
      subtitle="무지막지 반가워요!"
      footer={
        <>
          아직 계정이 없으신가요?{" "}
          <button
            onClick={() => nav("/signup")}
            className="font-semibold text-violet-600 hover:underline"
          >
            회원가입
          </button>
        </>
      }
    >
      <AuthForm mode="signin" onSubmit={handleSignIn} />
    </Shell>
  );
}
