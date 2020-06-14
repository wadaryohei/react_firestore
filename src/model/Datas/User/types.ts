export interface UserData {
  id: string
  isFollow?: boolean
  followerCount?: number
  followingCount?: number
  name: string | undefined
  photoURL: string | undefined
}

export interface UserPostsData {
  docId: string
  authorId: string
  postBody: string
}
