import { createBrowserRouter } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export const router = createBrowserRouter([
  { path: "/", element: <SignInPage /> },   // 임시로 루트=로그인
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);
