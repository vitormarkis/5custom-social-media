import axios, { AxiosResponse } from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { IUser, loginCredentialsSchema, TLoginCredentials } from "./schemas"

interface ILamaAuthContext {
  currentUser: IUser | null
  login: (credentials: TLoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

export const LamaAuthContext = createContext({} as ILamaAuthContext)

const LamaAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("lamaUser") || "{}") || null
  )

  useEffect(() => {
    const storagedUser = JSON.parse(localStorage.getItem("lamaUser") || "{}")
    setCurrentUser(storagedUser)
  }, [])

  const login = async (credentials: TLoginCredentials) => {
    const { password, username } = loginCredentialsSchema.parse(credentials)
    const { data } = await axios.post<{}, AxiosResponse<{ message: string; user: IUser }>>(
      "http://localhost:3434/api/auth/login",
      { password, username }
    )
    setCurrentUser(data.user)
    localStorage.setItem("lamaUser", JSON.stringify(data.user))
    try {
    } catch (error) {
      console.log(error)
      localStorage.removeItem("lamaUser")
    }
  }

  const logout = async () => {
    const res: any = await axios.post("http://localhost:3434/api/auth/logout")
    setCurrentUser(null)
    localStorage.removeItem("lamaUser")
    console.log(res.data.message)
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
