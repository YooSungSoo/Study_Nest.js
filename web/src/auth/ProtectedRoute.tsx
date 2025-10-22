// src/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="p-8 text-slate-600">인증 확인 중…</div>;
  if (!user) {
    // 로그인 후 원래 가려던 곳으로 돌아오도록 state에 저장
    return <Navigate to="/signin" replace state={{ from: loc }} />;
  }
  return children;
}
