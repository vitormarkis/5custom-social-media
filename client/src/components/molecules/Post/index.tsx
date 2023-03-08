import * as Popover from "@radix-ui/react-popover"
import { Bookmark } from "@styled-icons/bootstrap/Bookmark"
import { Chat } from "@styled-icons/bootstrap/Chat"
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import { useLamaAuth } from "../../../_features/LamaAuth/context"
import { Props } from "./types"

const Post: React.FC<Props> = ({ post }) => {
  const { currentUser } = useLamaAuth()
  const postCreatedAt = moment(post.post_created_at).fromNow()
  const navigate = useNavigate()

  return (
    <article
      key={post.post_id}
      onClick={() => navigate("/post/" + post.post_id)}
      className="relative flex cursor-pointer items-start border-b border-b-black bg-gray-800"
    >
      <div className="flex h-full w-12 shrink-0 flex-col overflow-hidden border-r border-r-black">
        <img
          className="block w-full grow object-cover"
          src={post.profile_pic}
        />
      </div>
      <div className="flex flex-col items-start p-2 w-full">
        <div className="flex grow items-center gap-2 w-full">
          <div>
            {post.username === currentUser?.username ? (
              <p className=" font-semibold text-emerald-400">{post.username}</p>
            ) : (
              <p className=" text-gray-200">{post.username}</p>
            )}
          </div>
          <div className="flex grow">
            <p className="text-xs italic text-gray-500">{post.post_created_at && postCreatedAt}</p>
            <p className="text-xs italic text-gray-500 ml-auto">{post.comments_amount} {post.comments_amount === 1 ? "comentário" : "comentários"}</p>
          </div>
        </div>
        <div className="">
          {post.username === currentUser?.username ? (
            <p className="">{post.text}</p>
          ) : (
            <p className=" text-gray-400">{post.text}</p>
          )}
        </div>
      </div>

      <div className="ml-auto flex h-full flex-col justify-around border-l border-l-gray-900">
        <div className="flex grow items-center justify-center border-b border-b-gray-900 px-2 py-2">
          <Bookmark height={16} />
        </div>
        <div className="flex grow items-center justify-center border-b border-b-gray-900 px-2 py-2">
          <Chat height={16} />
        </div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <div className="flex grow items-center justify-center px-2 py-2">
              <ThreeDots height={16} />
            </div>
          </Popover.Trigger>
          <Popover.Content
            asChild
            align="end"
          >
            <div className="z-30 rounded-lg bg-slate-700 py-1 px-1">
              <button
                className="flex w-full items-center gap-2 rounded-md py-0.5 px-2 text-gray-400 hover:bg-slate-600 hover:text-white"
                // onClick={handleLogoutButton}
              >
                <p>Editar</p>
              </button>
              <button
                className="flex w-full items-center gap-2 rounded-md py-0.5 px-2 text-gray-400 hover:bg-slate-600 hover:text-white"
                // onClick={handleLogoutButton}
              >
                <p>Excluir</p>
              </button>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </article>
  )
}

export default Post
