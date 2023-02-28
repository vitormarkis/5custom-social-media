import { createContext, useContext, useState } from "react"
import { userSchema } from "./schemas"
import { IAuthentication, ILogin, IUser } from "./types"
import { useApi } from "./useApi"

export const AuthContext = createContext<IAuthentication>({} as IAuthentication)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const api = useApi()

  async function login(userdata: ILogin) {
    try {
      const { token, user: responseUser } = await api.login(userdata)
      const parsedUser = userSchema.parse(responseUser)
      setUser(parsedUser)
      return true
    } catch (error) {
      console.log(error)
      await api.logout()
      setUser(null)
      return false
    }
  }

  function logout() {
    setUser(null)
  }

  // const value = useMemo(
  //   () => ({
  //     user,
  //     login,
  //     logout,
  //   }),
  //   [user]
  // )

  const value = {
    user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider
      value={value}
      children={children}
    />
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
