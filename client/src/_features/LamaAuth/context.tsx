import { AxiosResponse } from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { IUser, loginCredentialsSchema, TLoginCredentials } from "../../schemas/schemas"
import { api } from "../../services/axios"

interface ILamaAuthContext {
  currentUser: IUser | null
  login: (credentials: TLoginCredentials) => Promise<void>
  logout: () => Promise<void>
  userRole?: null
}

export const LamaAuthContext = createContext({} as ILamaAuthContext)

const LamaAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [userRole, setUserRole] = useState<any>("user")
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("lamaUser") || "{}") || null
  )

  useEffect(() => {
    const storagedUser = JSON.parse(localStorage.getItem("lamaUser") || "{}")
    setCurrentUser(storagedUser)
  }, [])

  const login = async (credentials: TLoginCredentials) => {
    const { password, username } = loginCredentialsSchema.parse(credentials)
    const { data } = await api.post<
      {},
      AxiosResponse<{ message: string; user: IUser; accessToken: string; refreshToken: string }>
    >("/auth/login", { password, username })
    setCurrentUser(data.user)
    localStorage.setItem("lamaUser", JSON.stringify(data.user))
    localStorage.setItem("refreshToken", data.refreshToken)
    try {
    } catch (error) {
      console.log(error)
      localStorage.removeItem("lamaUser")
      localStorage.removeItem("refreshToken")
    }
  }

  const logout = async () => {
    const res: any = await api.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    )
    setCurrentUser(null)
    localStorage.removeItem("lamaUser")
  }

  const value: ILamaAuthContext = {
    login,
    currentUser,
    logout,
  }

  return (
    <LamaAuthContext.Provider
      value={value}
      children={children}
    />
  )
}

export const useLamaAuth = () => useContext(LamaAuthContext)

export default LamaAuth
