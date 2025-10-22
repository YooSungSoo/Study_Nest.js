// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostEditPage from "./pages/PostEditPage";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/posts/new", element: <PostCreatePage /> },
  { path: "/posts/:id", element: <PostDetailPage /> },
  { path: "/posts/:id/edit", element: <PostEditPage /> },
]);
