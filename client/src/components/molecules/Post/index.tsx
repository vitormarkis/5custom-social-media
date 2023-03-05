import * as Popover from "@radix-ui/react-popover"
import { Bookmark } from "@styled-icons/bootstrap/Bookmark"
import { Chat } from "@styled-icons/bootstrap/Chat"
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots"
import moment from "moment"
import { useLamaAuth } from "../../../_features/LamaAuth/context"
import { Props } from "./types"

const Post: React.FC<Props> = ({ post }) => {
  const { currentUser } = useLamaAuth()
  const postCreatedAt = moment(post.post_created_at).fromNow()

  return (
    <article
      key={post.post_id}
      className="bg-gray-800 border-b border-b-black flex relative items-start cursor-pointer"
    >
      <div className="w-12 h-full flex flex-col overflow-hidden border-r border-r-black shrink-0">
        <img
          className="block w-full grow object-cover"
          src={post.profile_pic}
        />
      </div>
      <div className="flex flex-col items-start p-2">
        <div className="grow flex items-center justify-center gap-2">
          <div>
            {post.username === currentUser?.username ? (
              <p className=" text-emerald-400 font-semibold">{post.username}</p>
            ) : (
              <p className=" text-gray-200">{post.username}</p>
            )}
          </div>
          <div>
            <p className="text-xs italic text-gray-500">{post.post_created_at && postCreatedAt}</p>
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

      <div className="ml-auto border-l border-l-gray-900 h-full flex flex-col justify-around">
        <div className="px-2 py-2 grow flex items-center justify-center border-b border-b-gray-900">
          <Bookmark height={16} />
        </div>
        <div className="px-2 py-2 grow flex items-center justify-center border-b border-b-gray-900">
          <Chat height={16} />
        </div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <div className="px-2 py-2 grow flex items-center justify-center">
              <ThreeDots height={16} />
            </div>
          </Popover.Trigger>
          <Popover.Content
            asChild
            align="end"
          >
            <div className="py-1 px-1 bg-slate-700 rounded-lg z-30">
              <button
                className="w-full py-0.5 px-2 hover:bg-slate-600 hover:text-white text-gray-400 rounded-md flex gap-2 items-center"
                // onClick={handleLogoutButton}
              >
                <p>Editar</p>
              </button>
              <button
                className="w-full py-0.5 px-2 hover:bg-slate-600 hover:text-white text-gray-400 rounded-md flex gap-2 items-center"
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
