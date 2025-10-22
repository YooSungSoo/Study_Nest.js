// src/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 아직 유저 복원(로컬스토리지 → 상태) 중이면 잠깐 대기 UI
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-slate-600">세션 확인 중…</div>
      </div>
    );
  }

  // 미로그인 → 로그인 페이지로 보내되, 돌아올 목적지 기억
  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // 로그인 상태면 원래 페이지 렌더
  return <>{children}</>;
}
