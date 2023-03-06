import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { postPageSchema } from "../schemas/posts"
import { api } from "../services/axios"

const PostPage: React.FC = () => {
  const { postId } = useParams()

  const { data: rawPost } = useQuery<unknown>({
    queryKey: ["post", postId],
    queryFn: () => api.get("/posts/" + postId).then((res) => res.data),
    staleTime: 1000 * 60, // 1 minuto
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
      </div>
    </div>
  )
}

export default PostPage
