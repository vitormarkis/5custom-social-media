import { useQuery } from "@tanstack/react-query"
import Spinner from "../components/Spinner"
import { api } from "../services/axios"
import { useLamaAuth } from "../_features/LamaAuth/context"
import { IUser } from "../_features/LamaAuth/schemas"

const Profile: React.FC = () => {
  const { currentUser } = useLamaAuth()

  // if (!currentUser) return null

  const { data: user } = useQuery<IUser>({
    queryKey: ["user", currentUser?.id],
    queryFn: () => api.get("/users").then((response) => response.data),
    staleTime: 1000 * 60, // 1 minuto
    enabled: !!currentUser,
  })

  const name = user ? user.name : <Spinner height={16} width={120} />
  const email = user ? user.email : <Spinner height={14} width={170} />
  const username = user ? user.username : <Spinner height={12} width={100} />

  return (
    <div className="max-w-[1280px] w-full mx-auto h-full p-8">
      <div className="flex gap-2 items-center">
        <div className="rounded-full w-24 h-24 border-2 border-black overflow-hidden">
          {user ? (
            <img
              src={user.profile_pic}
              className="block w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 animate-pulse"></div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold grow">{name}</h1>
          <span className="block text-gray-400 text-sm w-full">{email}</span>
          <span className="block text-gray-600 text-xs">{username}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
