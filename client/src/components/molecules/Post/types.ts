export interface APIPost {
  post_id: number
  profile_pic: string
  username: string
  text: string
  post_created_at: Date
  post_author_id: number
}

export interface Props {
  post: APIPost
}