import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IPostBody, postBodySchema } from "../schemas/posts"
import { api } from "../services/axios"
import queryClient from "../services/queryClient"

import NewPostInput from "../components/molecules/NewPostInput"
import Post from "../components/molecules/Post"
import { APIPost } from "../components/molecules/Post/types"

const fakePosts = [
  "Autenticação com refresh token são mais seguras porque impossibilitam que o atacante possa ter acesso ao conteúdo da conta por muito tempo.",
  "Pra conseguir definir o tempo de expiração do cookie, eu tive que usar outra biblioteca de decifração pra conseguir pegar o tempo de expiração e então setar o tempo de expiração do cookie como o mesmo tempo de expiração do token.",
  `Cara eu to testando
  uma palavra por linha
  vamos ver no que
  vai dar!`,
]

const Posts: React.FC = () => {
  const [messagesLayoutStyle, setMessagesLayoutStyle] = useState(1)
  const { reset } = useForm<IPostBody>()
  const { mutate } = useMutation({
    mutationFn: (newPostData: IPostBody) => api.post("/posts", newPostData),
    onSuccess: () => {
      queryClient.invalidateQueries()
      reset()
    },
    onError: console.log,
  })

  const { data: rawPosts } = useQuery<APIPost[]>({
    queryKey: ["posts"],
    queryFn: () => api.get("/posts").then((response) => response.data),
    staleTime: 1000 * 10,
    onError: console.log,
  })

  const posts = rawPosts?.sort((a, b) => (a.post_created_at > b.post_created_at ? 1 : -1))

  return (
    <div className="max-w-[1280px] w-full mx-auto h-full p-8 flex">
      <main className="flex flex-col gap-6 justify-between grow">
        {messagesLayoutStyle === 0 ? (
          <section className="flex flex-col gap-7">
            {posts &&
              posts.map((post: any) => (
                <article
                  key={post?.post_id}
                  className="p-4 gap-4 rounded-lg bg-gray-800 flex relative items-start"
                >
                  <div className="absolute top-0 left-3 -translate-y-1/2 py-0.5 px-2 text-sm leading-4 rounded-md bg-emerald-700">
                    <p className="">{post?.username}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1.5">
                    <img
                      src={post?.profile_pic}
                      className="w-full h-full block object-cover"
                    />
                  </div>
                  <p>{post?.text}</p>
                </article>
              ))}
          </section>
        ) : messagesLayoutStyle === 1 ? (
          <section className="flex flex-col">
            {posts &&
              posts.map((post) => (
                <Post
                  key={post.post_id}
                  post={post}
                />
              ))}
          </section>
        ) : (
          <h1>Um erro no messagesLayoutStyle aconteceu!</h1>
        )}
        <NewPostInput
          mutate={mutate}
          fieldsParser={postBodySchema}
        />
      </main>
    </div>
  )
}

export default Posts
