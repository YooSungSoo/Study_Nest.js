// src/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = { name: string; email: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const LS_KEY = "app.auth.user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 로컬스토리지에서 세션 복원
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {}
    }
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    // TODO: 실제 API 연동 시 여기에서 요청 후 토큰/유저정보 저장
    // 지금은 데모: 아무 값이나 OK
    await new Promise((r) => setTimeout(r, 300));
    const next = { name: email.split("@")[0] || "Soo", email };
    setUser(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  }

  const value = useMemo(() => ({ user, loading, signIn, signOut }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
