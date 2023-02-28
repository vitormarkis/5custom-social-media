import { Navigate } from "react-router-dom"
import { useAuth } from "./context"

const PrivilegedPage: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { userStatus } = useAuth()

  return userStatus === "isValidating" ? (
    <div className="max-w-[1280px] w-full flex justify-center pt-[5vh]">
      <h1 className="text-xl font-semibold">Carregando...</h1>
    </div>
  ) : userStatus === "available" ? (
    children
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivilegedPage
