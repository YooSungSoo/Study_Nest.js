import AuthForm, { type SignInValues } from "../components/auth/AuthForm";
import Shell from "./_Shell";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const nav = useNavigate();

  const handleSignIn = async (v: SignInValues) => {
    // TODO: 실제 로그인 API 연동 (예: await auth.signIn(v))
    await new Promise((r) => setTimeout(r, 600));
    alert(`로그인 성공: ${v.email}`);
    nav("/"); // 로그인 후 이동할 경로
  };

  return (
    <Shell
      title="로그인"
      subtitle="무지막지 반가워요!"
      footer={
        <>
          아직 계정이 없으신가요?{" "}
          <button onClick={() => nav("/signup")} className="font-semibold text-violet-600 hover:underline">
            회원가입
          </button>
        </>
      }
    >
      <AuthForm mode="signin" onSubmit={handleSignIn} />
    </Shell>
  );
}
