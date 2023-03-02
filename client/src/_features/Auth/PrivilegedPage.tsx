import { Navigate } from "react-router-dom"
import { useLamaAuth } from "../LamaAuth/context"

interface PrivilegedPageProps {
  roles: string[]
  children: JSX.Element
}

const PrivilegedPage: React.FC<PrivilegedPageProps> = ({ children, roles }) => {
  const { userRole } = useLamaAuth()

  return !userRole ? (
    <Navigate to="/login" />
  ) : roles.includes(userRole) ? (
    children
  ) : (
    <div>Você não possui autorização para acessar essa página.</div>
  )
}

export default PrivilegedPage
