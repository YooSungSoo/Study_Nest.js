const rawBase = import.meta.env.VITE_API_URL?.trim();
const normalizedBase = rawBase ? rawBase.replace(/\/$/, "") : "http://localhost:3000/api";

export const API_BASE_URL = normalizedBase;

export function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiFetch(path: string, init?: RequestInit) {
  try {
    return await fetch(buildApiUrl(path), init);
  } catch (err) {
    throw new Error("서버와 통신할 수 없습니다. 서버가 실행 중인지 확인해 주세요.");
  }
}
