import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const refreshToken = localStorage.getItem("refreshToken")

    if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        console.log("Access Token inválido.")
        await axios.post(
          import.meta.env.VITE_SERVER_URL + "/auth/refresh-token",
          { refreshToken },
          { withCredentials: true }
        )

        return await api(originalRequest)
      } catch (error: any) {
        if (error.response.status === 401 && error.response.data.error_type === "INVALID_REFRESH_TOKEN") {
          console.log("Refresh Token inválido.")
          localStorage.removeItem("lamaUser")
          localStorage.removeItem("refreshToken")
          await axios.post(import.meta.env.VITE_SERVER_URL + "/auth/logout", {}, { withCredentials: true })
        }
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  }
)
