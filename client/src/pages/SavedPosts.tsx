import { Bookmark } from "@styled-icons/bootstrap/Bookmark"
import { BookmarkFill } from "@styled-icons/bootstrap/BookmarkFill"
import { ChatSquareDots } from "@styled-icons/bootstrap/ChatSquareDots"
import { useState } from "react"

const relationships = [
  {
    relationship_id: 2,
    followed_user_id: 1,
  },
  {
    relationship_id: 71,
    followed_user_id: 4,
  },
  {
    relationship_id: 72,
    followed_user_id: 6,
  },
  {
    relationship_id: 86,
    followed_user_id: 5,
  },
]

const likedPosts = [
  {
    post_id: 1,
    text: "O barça vai vir forte esse ano, com a contratação do Roberto Carlos e do Didi, o Cristiano vai sofrer.",
    likes_amount: 7,
    comments_amount: 12,
    profile_pic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8ayX7udeRDac-2P_tDJkC7eGQ6QGe7C0A&usqp=CAU",
    author_id: 5,
    username: "ikedias",
    name: "Michel Dias",
  },
  {
    post_id: 2,
    text: "Cara eu acho que nesse último grenal, não foi justo, eu acho que teve dedo das casas de apostas nesse jogo, porque...",
    likes_amount: 0,
    comments_amount: 1,
    profile_pic: "https://img.quizur.com/f/img60d0d76e470cb8.51574981.jpg?lastEdited=1624299378",
    author_id: 3,
    username: "leoschell",
    name: "Leonardo Schell",
  },
  {
    post_id: 3,
    text: "Autenticação com refresh token são mais seguras porque impossibilitam que o atacante possa ter acesso ao conteúdo da conta por muito tempo. Eu descobri que é muito melhor deixar as divs como display flex e ir usando grow e shrink do que ficar tentando ajustar o tamanho de tudo com width e max-width, principamente quando envolve view port!",
    likes_amount: 1,
    comments_amount: 0,
    profile_pic: "https://img.quizur.com/f/img60d0d76e470cb8.51574981.jpg?lastEdited=1624299378",
    author_id: 3,
    username: "leoschell",
    name: "Leonardo Schell",
  },
]

const SavedPosts: React.FC = () => {
  const [likedPostsArray, setLikedPostsArray] = useState(
    likedPosts.reduce((acc: number[], item) => (acc.push(item.post_id), acc), [])
  )
  const [followedUserIdArray, setFollowedUserIdArray] = useState(
    relationships.reduce((acc: number[], item) => (acc.push(item.followed_user_id), acc), [])
  )

  function handleToggleLikePost(postId: number) {
    setLikedPostsArray((prevState) =>
      prevState.includes(postId) ? prevState.filter((post_id) => post_id !== postId) : [...prevState, postId]
    )
  }

  function handleToggleFollowUser(userId: number) {
    setFollowedUserIdArray((prevState) =>
      prevState.includes(userId) ? prevState.filter((post_id) => post_id !== userId) : [...prevState, userId]
    )
  }

  return (
    <div>
      <div>
        <div className="flex justify-center">
          <div className="bg-true w-full max-w-[560px] bg-gray-900">
            {likedPosts.map((post) => (
              <div className="flex flex-col gap-2 p-4 not-last-of-type:border-b not-last-of-type:border-b-slate-500">
                <div className="flex gap-2">
                  <div className="shrink-0 h-12 w-12 overflow-hidden border border-slate-500">
                    <img
                      src={post.profile_pic}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 self-center leading-4">
                    <p className="font-semibold text-cyan-400">{post.name}</p>
                    <p className="text-sm text-slate-500">@{post.username}</p>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <div onClick={() => handleToggleFollowUser(post.author_id)}>
                      {followedUserIdArray.includes(post.author_id) ? (
                        <button className=" border border-cyan-600 bg-cyan-600 px-6 py-1.5 text-sm leading-4">
                          Seguir
                        </button>
                      ) : (
                        <button className=" border border-slate-500 px-6 py-1.5 text-sm leading-4">
                          Seguindo
                        </button>
                      )}
                    </div>
                    <div>
                      <button className=" border border-slate-500 bg-gray-700 px-6 py-1.5 text-sm leading-4">
                        Mensagem
                      </button>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div
                      onClick={() => handleToggleLikePost(post.post_id)}
                      className="group cursor-pointer rounded-md p-2 transition-all duration-100 hover:bg-gray-700"
                    >
                      <div className="h-5 w-5 -translate-y-[3px]">
                        {likedPostsArray.includes(post.post_id) ? (
                          <BookmarkFill className="text-gray-500 transition-all duration-100 group-hover:text-white" />
                        ) : (
                          <Bookmark />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="text-neutral-200">{post.text}</p>
                  </div>
                  <div className="mt-2 flex gap-5">
                    {post.likes_amount > 0 && (
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <div className="h-4 w-4 -translate-y-[3px]">
                          <Bookmark className="" />
                        </div>
                        <p>
                          {post.likes_amount} {post.likes_amount === 1 ? "like" : "likes"}
                        </p>
                      </div>
                    )}
                    {post.comments_amount > 0 && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <div className="h-4 w-4 leading-4">
                          <ChatSquareDots className="" />
                        </div>
                        <p>
                          {post.comments_amount} {post.comments_amount === 1 ? "commentário" : "comentários"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedPosts
