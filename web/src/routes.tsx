// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostEditPage from "./pages/PostEditPage";
import ProtectedRoute from "./auth/ProtectedRoute";

export const router = createBrowserRouter([
  // 공개 라우트
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },

  // 보호 라우트 (로그인 필요)
  { path: "/", element: (
      <ProtectedRoute><MainPage /></ProtectedRoute>
    ) },
  { path: "/posts/new", element: (
      <ProtectedRoute><PostCreatePage /></ProtectedRoute>
    ) },
  { path: "/posts/:id", element: (
      <ProtectedRoute><PostDetailPage /></ProtectedRoute>
    ) },
  { path: "/posts/:id/edit", element: (
      <ProtectedRoute><PostEditPage /></ProtectedRoute>
    ) },
]);
