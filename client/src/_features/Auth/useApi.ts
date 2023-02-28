import { AxiosResponse } from "axios"
import { api } from "../../services/axios"
import { tokenSchema } from "./schemas"
import { ILogin, IUser, ResponseLogin, TToken } from "./types"

export const useApi = () => ({
  validateToken: async (token: TToken): Promise<boolean> => {
    const parsedToken = tokenSchema.parse(token)
    const { data: response } = await api.post<boolean>("/validate", parsedToken)
    return response
  },
  login: async (userdata: ILogin): Promise<ResponseLogin> => {
    return {
      user: {
        avatar_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMfXJvqaf9X2uJa_YG0PBbRUSVcHEaEbVxw&usqp=CAU",
        email: "vitormarkis@gmail.com",
        name: "Vitor Markis",
        username: "vitormarkis",
      },
      token: "123hbue2378inufiwe8h7h23ue78rhun7t38h4fun7",
    }
    const { data: response } = await api.post<IUser, AxiosResponse<ResponseLogin>, ILogin>("/login", userdata)
    return response
  },
  logout: async (): Promise<any> => {
    const { data: response } = await api.post("/logout")
    return response
  },
})
