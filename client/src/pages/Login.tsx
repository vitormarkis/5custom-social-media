import { useContext } from "react"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../_features/Auth/context"
import { useLamaAuth } from "../_features/LamaAuth/context"
import { loginCredentialsSchema, TLoginCredentials } from "../_features/LamaAuth/schemas"

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<TLoginCredentials>()
  const navigate = useNavigate()
  // const auth = useContext(AuthContext)

  const { login } = useLamaAuth()

  const submitHandler: SubmitHandler<TLoginCredentials> = async (userdata) => {
    try {
      const parsedUserdata = loginCredentialsSchema.parse(userdata)
      await login(parsedUserdata)
      navigate("/profile")
    } catch (error) {
      console.log(error)
      return alert("Usuário ou senha incorretos")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="p-6 rounded-2xl mx-auto my-14 w-[420px] bg-gray-800 flex flex-col gap-4"
    >
      <div>
        <h1 className="text-xl font-semibold">👇 Entrar</h1>
        <h3 className="text-sm text-gray-500">Faça login para continuar.</h3>
      </div>
      <input
      autoComplete="off"
        type="text"
        {...register("username")}
        placeholder="Digite seu username..."
        className="p-3 rounded-lg border-2 border-black bg-gray-700"
      />
      <input
      autoComplete="off"
        type="password"
        {...register("password")}
        placeholder="Digite sua senha..."
        className="p-3 rounded-lg border-2 border-black bg-gray-700"
      />

      <button
        type="submit"
        className="p-3 rounded-lg border-2 border-black bg-green-600"
      >
        Enviar
      </button>
    </form>
  )
}

export default Login
