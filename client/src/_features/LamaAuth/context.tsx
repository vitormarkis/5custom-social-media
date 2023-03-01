import axios from "axios"
import { createContext, useContext, useState } from "react"
import { IUser, loginCredentialsSchema, TLoginCredentials } from "./schemas"

interface ILamaAuthContext {
  currentUser: IUser | null
  login: (credentials: TLoginCredentials) => Promise<void>
}

export const LamaAuthContext = createContext({} as ILamaAuthContext)
const [currentUser, setCurrentUser] = useState<IUser | null>(
  JSON.parse(localStorage.getItem("lamaUser")!) || null
)

const login = async (credentials: TLoginCredentials) => {
  const { password, username } = loginCredentialsSchema.parse(credentials)
  const { user } = await axios.post<{}, { message: string; user: IUser }>(
    "http://localhost:3434/api/auth/login",
    { password, username }
  )
  setCurrentUser(user)
  try {
  } catch (error) {
    console.log(error)
    localStorage.removeItem("lamaUser")
  }
}

const value: ILamaAuthContext = {
  login,
  currentUser,
}

const LamaAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LamaAuthContext.Provider
      value={value}
      children={children}
    />
  )
}

export const useLamaAuth = () => useContext(LamaAuthContext)

export default LamaAuth
