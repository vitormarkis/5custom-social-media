import axios from "axios"
import { useLamaAuth } from "../_features/LamaAuth/context"

export const api = axios.create({
  baseURL: "http://localhost:3434/api",
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const refreshToken = getRefreshToken()

    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true
      try {
        const { accessToken } = await revalidateAccessToken(refreshToken)
        setAccessTokenCookie(accessToken)
        return await api(originalRequest)
      } catch (error: any) {
        if (error.response.status === 401 && error.response.data.type === "INVALID_REFRESH_TOKEN") {
          await axios.post("http://localhost:3434/api/auth/logout", {}, { withCredentials: true })
          window.location.href = "/login"
        }
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  }
)

const revalidateAccessToken = (refreshToken: string): Promise<{ accessToken: string }> =>
  axios
    .post("http://localhost:3434/api/auth/refresh-token", { refreshToken }, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.type === "INVALID_REFRESH_TOKEN" && error.response.status === 401) {
        const { logout } = useLamaAuth()
        logout()
      }
      return error
    })

export function setAccessTokenCookie(accessToken: string) {
  // const { exp } = jwt_decode(accessToken) as { exp: number }
  // if (!exp) throw new Error("Formato do token de acesso é inválido!")
  const expiracao = new Date()
  expiracao.setDate(expiracao.getDate() + 7)
  document.cookie = `accessToken=${accessToken}; expires=${expiracao.toUTCString()}`
}

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken") ?? ""
}
export const getAccessToken = () => {
  return localStorage.getItem("accessToken") ?? ""
}
