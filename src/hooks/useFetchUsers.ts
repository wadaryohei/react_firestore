import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef } from 'react'
import { UserType } from '../model/User/types'


//----------------------------------
// type
//----------------------------------
export interface userFetchUsersType {
  fetchUserData: () => UserType | undefined
}

//----------------------------------
// hooks
//----------------------------------
export const useFetchUsers = (
  collection: string,
  user: firebase.User | null
): userFetchUsersType => {
  const [_fetchUser, _setFetchUser] = useState<UserType>()
  const mounted = useRef(true)

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const init = async () => {
      // 自分のユーザー情報をonSnapShotでリアルタイム取得
      const userUnsubscribe = await userSnapShot(collection, user)

      // コンポーネントのアンマウント時にはonSnapShotをUnsubscribeする
      return () => {
        userUnsubscribe()
      }
    }
    init()

    return () => {
      mounted.current = false
    }
    // eslint-disable-next-line
  }, [collection, user])

  /**
   * fireStoreからユーザーを取得する
   */
  const userSnapShot = async (
    collection: string,
    user: firebase.User | null
  ): Promise<() => void> => {
    return firebase
      .firestore()
      .collection(collection)
      .doc(user?.uid)
      .onSnapshot(snap => {
        const _datas = {
          id: snap.id,
          name: snap.data()?.name as string,
          followerCount: snap.data()?.followerCount as number,
          followingCount: snap.data()?.followingCount as number,
          photoURL: snap.data()?.photoURL as string
        }
        if (mounted.current) {
          _setFetchUser(_datas)
        }
      })
  }

  /**
   * DBから取得したユーザーデータを返す
   */
  const fetchUserData = (): UserType | undefined => {
    return _fetchUser
  }

  return {
    fetchUserData
  }
}
