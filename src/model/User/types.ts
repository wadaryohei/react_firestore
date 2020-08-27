export interface UserType {
  id: string
  followerCount?: number
  followingCount?: number
  name: string | undefined
  photoURL: string | undefined
}

export interface fromUserType {
  userId: string | undefined
  userDoc: {
    name: string
    photoURL: string
  }
}

export interface toUserType {
  userId: string | undefined
  userDoc: {
    name: string
    photoURL: string
  }
}
