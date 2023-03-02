import axios from "axios"
import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"

export const api = axios.create({
  baseURL: "http://localhost:3434/api",
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log({ error })
    const originalRequest = error.config
    const refreshToken = getRefreshToken()

    console.log({ originalRequest, refreshToken })

    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true
      const { accessToken } = await revalidateAccessToken(refreshToken)
      console.log("accessToken vindo do backend: ", accessToken)
      setAccessTokenCookie(accessToken)
      return await api(originalRequest)
    } else {
      return Promise.reject(error)
    }
  }
)

const revalidateAccessToken = (refreshToken: string): Promise<{ accessToken: string }> =>
  axios
    .post("http://localhost:3434/api/auth/refresh-token", { refreshToken }, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => error)

export function setAccessTokenCookie(accessToken: string) {
  const { exp } = jwt_decode(accessToken) as { exp: number }
  if (!exp) throw new Error("Formato do token de acesso é inválido!")
  // const expires = new Date(exp * 1000).toUTCString()
  // console.log({
  //   settandoOCookie: {
  //     exp,
  //     expires,
  //     accessToken,
  //   },
  // })
  // Cookies.set("accessToken", accessToken, { expires: 9999, secure: true, sameSite: "none" })
  const expiracao = new Date()
  expiracao.setDate(expiracao.getDate() + 7)
  document.cookie = `accessToken=${accessToken}; expires=${expiracao.toUTCString()}`
}

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken") ?? ""
}
