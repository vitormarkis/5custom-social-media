import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { userSchema } from "./schemas"
import { ETokenValidating, IAuthentication, ILogin, IUser } from "./types"
import { useApi } from "./useApi"

export const AuthContext = createContext<IAuthentication>({} as IAuthentication)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [userStatus, setUserStatus] = useState<ETokenValidating>("isValidating")
  const api = useApi()

  useEffect(() => {
    const validateToken = async () => {
      const storageToken = getToken()
      if (storageToken) {
        const { responseUser, userStatus } = await api.getUserStatus(storageToken)
        console.log("Passou")
        if (responseUser) {
          console.log("Settando o user como: ", responseUser)
          setUserStatus(userStatus)
          setUser(responseUser)
        } else {
          console.log("Reprovou")
          setUserStatus("rejected")
        }
      } else {
        console.log("Reprovou")
        setUserStatus("rejected")
      }
    }

    validateToken()
  }, [])

  const setToken = useCallback(
    (token: string) => {
      localStorage.setItem("authToken", token)
    },
    [user]
  )

  const getToken = useCallback(() => localStorage.getItem("authToken"), [user])

  const login = useCallback(
    async (userdata: ILogin) => {
      console.log("dentro da função login")
      try {
        const { token, user: responseUser } = await api.login(userdata)
        const parsedUser = userSchema.parse(responseUser)
        console.log({ token })
        setToken(token)
        setUser(parsedUser)
        setUserStatus("available")
        return true
      } catch (error) {
        console.log(error)
        await api.logout()
        setUserStatus("rejected")
        setUser(null)
        return false
      }
    },
    [user]
  )

  const logout = useCallback(async () => {
    const res = await api.logout()
    setUser(null)
    setUserStatus("rejected")
    setToken("")
  }, [user])

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
    userStatus,
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
