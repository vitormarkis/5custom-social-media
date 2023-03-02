import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import RootLayout from "./Layouts/Root"
import Login from "./pages/Login"
import Posts from "./pages/Posts"
import Profile from "./pages/Profile"
import queryClient from "./services/queryClient"
import AuthProvider from "./_features/Auth/context"
import PrivilegedPage from "./_features/Auth/PrivilegedPage"
import LamaAuth from "./_features/LamaAuth/context"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        path: "/profile",
        element: (
          <PrivilegedPage roles={["user"]}>
            <Profile />
          </PrivilegedPage>
        ),
      },
      {
        path: "/posts",
        element: (
          <PrivilegedPage roles={["user"]}>
            <Posts />
          </PrivilegedPage>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LamaAuth>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LamaAuth>
    </QueryClientProvider>
  </React.StrictMode>
)
