import { Navigate } from "react-router-dom"
import { useLamaAuth } from "../LamaAuth/context"

const PrivilegedPage: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { currentUser } = useLamaAuth()

  return currentUser ? children : <Navigate to="/login" />
}

export default PrivilegedPage
