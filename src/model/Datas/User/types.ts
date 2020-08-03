export interface UserData {
  id: string
  isFollow?: boolean
  followerCount?: number
  followingCount?: number
  name: string | undefined
  photoURL: string | undefined
}
