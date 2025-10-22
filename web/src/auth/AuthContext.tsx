// src/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { signIn as signInRequest } from "../services/auth.service";

export type User = { name: string; email: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  // 선택: 토큰을 다른 서비스에서 읽고 싶을 때 사용
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

const LS_USER = "app.auth.user";
const LS_TOKEN = "app.auth.token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 앱 시작 시 로컬스토리지에서 세션 복원
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(LS_USER);
      const token = localStorage.getItem(LS_TOKEN);
      if (rawUser && token) {
        setUser(JSON.parse(rawUser));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const data = await signInRequest({ email, password });
      setUser(data.user);
      localStorage.setItem(LS_USER, JSON.stringify(data.user));
      localStorage.setItem(LS_TOKEN, data.token);
    } catch (err) {
      throw err instanceof Error ? err : new Error("로그인 중 오류");
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_TOKEN);
  }

  function getToken() {
    return localStorage.getItem(LS_TOKEN);
  }

  const value = useMemo(
    () => ({ user, loading, signIn, signOut, getToken }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
