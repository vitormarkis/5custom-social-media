import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { IPostBody, postBodySchema } from "../schemas/posts"
import { api } from "../services/axios"
import queryClient from "../services/queryClient"

import NewPostInput from "../components/molecules/NewPostInput"
import Post from "../components/molecules/Post"
import { APIPost } from "../components/molecules/Post/types"
import FollowSuggestion from "../components/organisms/FollowSuggestion"
import { useLamaAuth } from "../_features/LamaAuth/context"

const Posts: React.FC = () => {
  const { reset } = useForm<IPostBody>()
  const { currentUser } = useLamaAuth()
  const { mutate } = useMutation({
    mutationFn: (newPostData: IPostBody) => api.post("/posts", newPostData),
    onSuccess: () => {
      queryClient.invalidateQueries()
      reset()
    },
    onError: console.log,
  })

  const { data: rawPosts } = useQuery<APIPost[]>({
    queryKey: ["posts", currentUser?.id],
    queryFn: () => api.get("/posts").then((response) => response.data),
    staleTime: 1000 * 10,
    onError: console.log,
  })

  const posts = rawPosts?.sort((a, b) => (a.post_created_at > b.post_created_at ? 1 : -1))

  const followingUsersData = [
    {
      follower_user_id: currentUser?.id,
      followed_user_id: 4,
    },
    {
      follower_user_id: currentUser?.id,
      followed_user_id: 5,
    },
  ]

  return (
    <div className="flex">
      <div className="custom-scroll flex border-x border-x-gray-800">
        <main className="relative flex w-[900px] grow flex-col justify-between">
          <section className="chat custom-scroll flex flex-col-reverse overflow-auto">
            <div></div>
            <div className="flex flex-col ">
              {posts &&
                posts.map((post) => (
                  <Post
                    key={post.post_id}
                    post={post}
                  />
                ))}
            </div>
          </section>
          <div className="w-full gap-2 border-t border-t-black bg-gray-800 px-4 py-4">
            <NewPostInput
              className=""
              mutate={mutate}
              fieldsParser={postBodySchema}
            />
          </div>
        </main>
      </div>

      <FollowSuggestion />
    </div>
  )
}

export default Posts
