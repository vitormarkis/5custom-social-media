import { Navigate } from "react-router-dom"
import { useLamaAuth } from "../LamaAuth/context"

interface PrivilegedPageProps {
  roles: string[]
  children: JSX.Element
}

const PrivilegedPage: React.FC<PrivilegedPageProps> = ({ children, roles }) => {
  // const { currentUser } = useLamaAuth()
  const user = JSON.parse(localStorage.getItem("lamaUser") || "{}") || null

  return 'username' in user ? children : <Navigate to="/login" />
}

export default PrivilegedPage
