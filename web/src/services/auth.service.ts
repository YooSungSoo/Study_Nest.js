import { apiFetch } from "../config/api";

type AuthSuccess = {
  user: { name: string; email: string };
  token: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = "요청이 실패했습니다.";
    try {
      const data = await res.json();
      message = data?.message || data?.error || message;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(message);
  }
  return res.json();
}

export async function signIn(payload: { email: string; password: string }): Promise<AuthSuccess> {
  const res = await apiFetch("/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthSuccess>(res);
}

export async function signUp(payload: { email: string; password: string; nickname: string }): Promise<AuthSuccess> {
  const res = await apiFetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthSuccess>(res);
}
