import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { likedPostSchema, postLikesSchema } from "../schemas/post_likes";
import { api } from "../services/axios";
import { useLamaAuth } from "../_features/LamaAuth/context";

const SavedPosts: React.FC = () => {
  const { currentUser: me } = useLamaAuth()
  
  const { data: likedPosts } = useQuery({
    queryKey: ["liked-posts", me?.id],
    queryFn: () => api.get("/posts/liked-posts").then((res) => z.array(postLikesSchema).parse(res.data)),
    staleTime: 1000 * 60, // 1 minuto
    select: (likedPosts) => likedPostSchema.parse(likedPosts),
  })
  
  return (
    <div>Oi</div>
  );
}

export default SavedPosts;