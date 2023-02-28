import { useAuth } from "../_features/Auth/context"

const Profile: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-[1280px] w-full mx-auto h-full p-8">
      <div className="flex gap-2 items-center">
        <div className="rounded-full w-24 h-24 border-2 border-black overflow-hidden">
          <img src={user?.avatar_url} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">{user?.name}</h1>
          <span className="block text-gray-400 text-sm">{user?.email}</span>
          <span className="block text-gray-600 text-xs">@{user?.username}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
