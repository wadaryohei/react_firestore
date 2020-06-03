export interface UserData {
  id: string
  isFollow?: boolean
  name: string | undefined
  photoURL: string | undefined
}

export interface UserPostsData {
  docId: string
  authorId: string
  postBody: string
}
