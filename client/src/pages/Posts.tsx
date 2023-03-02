import { useQuery } from "@tanstack/react-query"
import { api } from "../services/axios"
import { useAuth } from "../_features/Auth/context"

const Posts: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get("/posts", { withCredentials: true }).then((response) => response.data),
    staleTime: 1000 * 10,
  })

  const { user } = useAuth()

  return (
    <div className="max-w-[1280px] w-full mx-auto h-full p-8">
      <div>
        <h1>{data && data}</h1>
      </div>
    </div>
  )
}

export default Posts
