import AuthForm, { type SignUpValues } from "../components/auth/AuthForm";
import Shell from "./_Shell";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const nav = useNavigate();

  const handleSignUp = async (v: SignUpValues) => {
    // TODO: 실제 회원가입 API 연동 (예: await auth.signUp(v))
    await new Promise((r) => setTimeout(r, 800));
    alert(`회원가입 완료: ${v.nickname ?? "사용자"} (${v.email})`);
    nav("/signin");
  };

  return (
    <Shell
      title="회원가입"
      subtitle="몇 가지 정보만 입력하면 바로 시작할 수 있어요"
      footer={
        <>
          이미 계정이 있으신가요?{" "}
          <button onClick={() => nav("/signin")} className="font-semibold text-violet-600 hover:underline">
            로그인
          </button>
        </>
      }
    >
      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </Shell>
  );
}
