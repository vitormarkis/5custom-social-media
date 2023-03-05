import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IPostBody, postBodySchema } from "../schemas/posts"
import { api } from "../services/axios"
import queryClient from "../services/queryClient"

import { Cursor } from "@styled-icons/bootstrap/Cursor"
import { CursorFill } from "@styled-icons/bootstrap/CursorFill"

import NewPostInput from "../components/molecules/NewPostInput"
import Post from "../components/molecules/Post"
import { APIPost } from "../components/molecules/Post/types"
import { useLamaAuth } from "../_features/LamaAuth/context"

const followUsers = [
  {
    user_id: 1,
    profile_pic: "https://tm.ibxk.com.br/2021/11/24/24162321481464.jpg?ims=1200x675",
    username: "vitormarkis",
    name: "Vitor Markis",
  },
  {
    user_id: 2,
    profile_pic:
      "https://1.bp.blogspot.com/-rwEdYIDEKQY/X52lu3v7-lI/AAAAAAAADbo/cZjgiCDgdpk6xQQpnJjmtJPRUZ-TDhgEwCLcBGAsYHQ/s500/ecfaf90f3d9128e0a9995af74f52770c.jpg",
    username: "kauanbarts",
    name: "Kauan Barts",
  },
  {
    user_id: 3,
    profile_pic: "https://img.quizur.com/f/img60d0d76e470cb8.51574981.jpg?lastEdited=1624299378",
    username: "leoschell",
    name: "Leonardo Schell",
  },
  {
    user_id: 4,
    profile_pic:
      "https://yt3.googleusercontent.com/ytc/AL5GRJWi9AyIP1ZFUGkoN5TJ4JRQiXjBWFHuvwIuux11=s900-c-k-c0x00ffffff-no-rj",
    username: "thomascrow",
    name: "Thomas Emmanuel",
  },
  {
    user_id: 5,
    profile_pic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8ayX7udeRDac-2P_tDJkC7eGQ6QGe7C0A&usqp=CAU",
    username: "ikedias",
    name: "Michel Dias",
  },
]

const Posts: React.FC = () => {
  const [messagesLayoutStyle, setMessagesLayoutStyle] = useState(1)
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
    queryKey: ["posts"],
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

  const followingUsers = followingUsersData.reduce((acc: number[], item) => {
    acc.push(item.followed_user_id)
    return acc
  }, [])

  return (
    <div className="flex">
      <div className="custom-scroll flex border-x border-x-gray-800">
        <main className="relative flex grow flex-col justify-between w-[900px]">
          <section className="flex flex-col chat overflow-auto custom-scroll">
            {posts &&
              posts.map((post) => (
                <Post
                  key={post.post_id}
                  post={post}
                />
              ))}
          </section>
          <div className="w-full bg-gray-800 px-4 py-4 gap-2 border-t border-t-black">
            <NewPostInput
            className=""
              mutate={mutate}
              fieldsParser={postBodySchema}
            />
          </div>
        </main>
      </div>

      <div className="hidden grow-[2] border-l border-l-gray-800 md:block">
        <div>
          <div className="border-b border-b-gray-800">
            <div className="mt-4 px-4">
              <h1 className="mb-2 text-2xl font-black">Sugestões:</h1>
            </div>
            <div className="flex flex-col">
              {followUsers.map((user) => {
                if (user.user_id === currentUser?.id) return

                return (
                  <div className="flex cursor-pointer items-center gap-1 py-2 px-4 hover:bg-gray-800">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-900 bg-gray-700">
                      <img
                        src={user.profile_pic}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-1 flex flex-col">
                      <h1>{user.name}</h1>
                      <p className="text-sm text-gray-500">{user.username}</p>
                    </div>
                    <div className="ml-auto flex w-[80px] flex-col items-center gap-1 px-2">
                      <button onClick={() => console.log(user.user_id)}>
                        {followingUsers.includes(user.user_id) ? (
                          <CursorFill width={24} />
                        ) : (
                          <Cursor width={24} />
                        )}
                      </button>
                      <span className="text-[10px] text-gray-400 hover:underline">
                        {followingUsers.includes(user.user_id) ? "Seguindo" : "Seguir"}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts
