import AuthForm, { type SignUpValues } from "../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import Shell from "./_Shell";
import { signUp as signUpRequest } from "../services/auth.service";
import { useAuth } from "../auth/AuthContext";

export default function SignUpPage() {
  const nav = useNavigate();
  const { signIn } = useAuth();

  const handleSignUp = async (v: SignUpValues) => {
    try {
      const nickname = v.nickname?.trim();
      if (!nickname) {
        throw new Error("닉네임을 입력해 주세요.");
      }

      const result = await signUpRequest({
        email: v.email,
        password: v.password,
        nickname,
      });

      // 회원가입 즉시 로그인 처리
      await signIn(v.email, v.password);
      alert(`${result.user.name}님, 회원가입이 완료되었습니다!`);
      nav("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "회원가입에 실패했습니다. 다시 시도해 주세요.";
      alert(message);
    }
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
