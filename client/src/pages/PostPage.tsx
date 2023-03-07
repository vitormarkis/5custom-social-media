import { useMutation, useQuery } from "@tanstack/react-query"
import moment from "moment"
import { useParams } from "react-router-dom"
import NewPostInput from "../components/molecules/NewPostInput"
import { IPostComment, postCommentBodySchema } from "../schemas/comments"
import { postPageSchema } from "../schemas/posts"
import { api } from "../services/axios"
import queryClient from "../services/queryClient"

// const commentaries = [
//   {
//     commentaryId: 1,
//     postId: 10,
//     text: "Muito legal!",
//     created_at: "2023-03-06 15:20:04",
//     profile_pic: "https://criticalhits.com.br/wp-content/uploads/2022/03/goku_an6e.h720.webp",
//     name: "Kauê Souza",
//     username: "kcsouza",
//   },
//   {
//     commentaryId: 2,
//     postId: 10,
//     text: "Nunca tinha parado para pensar sobre isso!",
//     created_at: "2023-03-05 15:20:04",
//     profile_pic: "https://criticalhits.com.br/wp-content/uploads/2022/03/goku_an6e.h720.webp",
//     name: "Kauê Souza",
//     username: "kcsouza",
//   },
//   {
//     commentaryId: 3,
//     postId: 10,
//     text: "Top",
//     created_at: "2023-03-06 10:05:04",
//     profile_pic: "https://img.quizur.com/f/img60d0d76e470cb8.51574981.jpg?lastEdited=1624299378",
//     name: "Leonardo Schell",
//     username: "leoschell",
//   },
// ]

const PostPage: React.FC = () => {
  const { postId } = useParams()

  const { data: rawPost } = useQuery<unknown>({
    queryKey: ["post", postId],
    queryFn: () => api.get("/posts/" + postId).then((res) => res.data),
    staleTime: 1000 * 60, // 1 minuto
  })

  const { data: commentaries } = useQuery<IPostComment[]>({
    queryKey: ["postComments", postId],
    queryFn: () => api.get(`/posts/${postId}/comments`).then((res) => res.data),
    staleTime: 1000 * 60,
  })

  const { mutate } = useMutation({
    mutationFn: async (commentBody) => {
      return api.post(`/posts/${postId}/comments`, commentBody)
    },
    onSuccess: () => queryClient.invalidateQueries(["postComments", postId]),
  })

  const parsedPost = rawPost ? postPageSchema.safeParse(rawPost) : null
  const post = parsedPost?.success ? parsedPost.data : null

  return (
    <div className="mt-6 px-6">
      <div className="flex gap-4">
        <div className="flex basis-36 flex-col items-center">
          <div className="relative z-20 mb-3 h-24 w-24 shrink-0">
            <div className="img-cover z-10 bg-emerald-500" />
            <img
              src={post?.profile_pic}
              className="relative z-20 h-full w-full object-cover"
            />
          </div>
          <div className="leading-4">
            <h2 className="text-lg font-semibold text-emerald-400">{post?.name}</h2>
            <p className="text-gray-400">@{post?.username}</p>
          </div>
        </div>
        <div className="flex grow flex-col">
          <div className="">
            <p className="mb-6 text-lg">{post?.text}</p>
            {post?.image && (
              <div className="h-[320px] w-full shrink-0 overflow-hidden">
                <img
                  src={post?.image ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="">
            <div className="flex flex-col gap-2">
              {commentaries &&
                commentaries.map((commentary) => {
                  if (String(commentary.post_id) != postId) return null
                  return (
                    <div
                      key={commentary.commentaryId}
                      className="flex gap-2"
                    >
                      <div className="flex flex-col items-center">
                        <div className="h-14 w-14 shrink-0">
                          <img
                            src={commentary.profile_pic}
                            className="relative z-20 h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h2 className="text-xs text-emerald-300">{commentary.name}</h2>
                          <span className=" text-xs italic text-gray-500">
                            {moment(commentary.created_at).fromNow()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{commentary.text}</p>
                        <div className="mt-auto flex gap-2">
                          <span className="cursor-pointer text-xs text-gray-400 underline ">Curtir</span>
                          <span className="cursor-pointer text-xs text-gray-400 underline">Reponder</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              <div className="mt-6">
              <NewPostInput
                mutate={mutate}
                fieldsParser={postCommentBodySchema}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPage
