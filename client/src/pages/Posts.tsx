import { useMutation, useQuery } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { IPostBody, postBodySchema } from "../schemas/post"
import { api } from "../services/axios"
import queryClient from "../services/queryClient"
import { useLamaAuth } from "../_features/LamaAuth/context"

const fakePosts = [
  "Autenticação com refresh token são mais seguras porque impossibilitam que o atacante possa ter acesso ao conteúdo da conta por muito tempo.",
  "Pra conseguir definir o tempo de expiração do cookie, eu tive que usar outra biblioteca de decifração pra conseguir pegar o tempo de expiração e então setar o tempo de expiração do cookie como o mesmo tempo de expiração do token.",
  `Cara eu to testando
  uma palavra por linha
  vamos ver no que
  vai dar!`,
]

const Posts: React.FC = () => {
  const { register, handleSubmit } = useForm<IPostBody>()
  const { mutate } = useMutation({
    mutationFn: (newPostData: IPostBody) => api.post("/posts", newPostData),
    onSuccess: () => queryClient.invalidateQueries(),
    onError: console.log
  })

  const submitHandler: SubmitHandler<IPostBody> = (formData) => {
    const parsedFormData = postBodySchema.parse(formData)
    mutate(parsedFormData)
  }

  const { currentUser } = useLamaAuth()

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get("/posts").then((response) => response.data),
    staleTime: 1000 * 10,
  })

  return (
    <div className="max-w-[1280px] w-full mx-auto h-full p-8 flex">
      <main className="flex flex-col gap-6 justify-between grow">
        <section className="flex flex-col gap-7">
          {fakePosts.map((post) => (
            <article
              key={post}
              className="p-4 gap-4 rounded-lg bg-gray-800 flex relative items-start"
            >
              <div className="absolute top-0 left-3 -translate-y-1/2 py-0.5 px-2 text-sm leading-4 rounded-md bg-emerald-700">
                <p className="-translate-y-[1.5px]">{currentUser?.username}</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1.5">
                <img
                  src={currentUser?.profile_pic}
                  className="w-full h-full block object-cover"
                />
              </div>
              <p>{post}</p>
            </article>
          ))}
        </section>
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">
          <textarea
            {...register("text")}
            placeholder="Fale um pouco sobre o que você está pensando..."
            className="h-32 resize-none p-3 rounded-lg border-2 border-black bg-gray-700 w-full"
          />
          <div className="flex flex-row justify-between">
            <div></div>
            <div>
              <button className="self-end resize-none px-8 py-2 rounded-full bg-blue-600">Enviar</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Posts
