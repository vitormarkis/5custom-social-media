import { useLamaAuth } from "./context";
import { Navigate } from "react-router-dom";

function PrivilegedPage({ children }: { children: JSX.Element }) {
  const user = JSON.parse(localStorage.getItem("lamaUser") || "{}") || null

  return 'id' in user && 'username' in user ? children : <Navigate to="/login" />
}

export default PrivilegedPage;