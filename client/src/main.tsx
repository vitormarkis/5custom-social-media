import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import RootLayout from "./Layouts/Root"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import AuthProvider from "./_features/Auth/context"
import PrivilegedPage from "./_features/Auth/PrivilegedPage"

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
          <PrivilegedPage>
            <Profile />
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
