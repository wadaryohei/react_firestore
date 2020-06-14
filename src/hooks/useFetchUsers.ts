import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef } from 'react'
import { UserData } from '../model/Datas/User/types'

//----------------------------------
// interface
//----------------------------------
export interface userFetchUsersProps {
  _isUserLoading: boolean
  fetchUserData: () => UserData | undefined
  fetchUsersData: () => UserData[] | undefined
}

//----------------------------------
// hooks
//----------------------------------
export const useFetchUsers = (
  collection: string,
  user: firebase.User | null
): userFetchUsersProps => {
  const [_fetchUser, _setFetchUser] = useState<UserData>()
  const [_fetchUsers, _setFetchUsers] = useState<UserData[]>([])
  const [_isUserLoading, _setIsUserLoading] = useState<boolean>(true)
  const mounted = useRef(true)

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const init = async () => {
      // 自分のユーザー情報をonSnapShotでリアルタイム取得
      const userUnsubscribe = await userSnapShot(collection, user)

      // 自分以外のユーザー情報をonSnapShotでリアルタイム取得
      const usersUnsubscribe = await usersSnapShot(collection, user)

      // コンポーネントのアンマウント時にはonSnapShotをUnsubscribeする
      return () => {
        userUnsubscribe()
        usersUnsubscribe()
      }
    }
    init()

    return () => {
      mounted.current = false
    }
    // eslint-disable-next-line
  }, [collection, user])

  /**
   * fireStoreからユーザー情報をonSnapShotでリアルタイムに取得する
   */
  const usersSnapShot = async (
    collection: string,
    user: firebase.User | null
  ): Promise<() => void> => {
    // usersコレクションを全件取得
    const usersRef = await firebase
      .firestore()
      .collection(collection)
      .get()

    // ログイン中のユーザー（自分以外の）ユーザーIDを抽出
    const docs = usersRef.docs.filter(doc => doc.id !== user?.uid)

    // socialコレクションのfollowingサブコレクションから自分がフォロー中のユーザーデータを抽出
    return firebase
      .firestore()
      .collection('social')
      .doc(user?.uid)
      .collection('following')
      .doc(user?.uid)
      .onSnapshot(async snap => {
        const _datas = docs.map(async doc => {
          const followers = await snap.data()?.[doc.id]
          return {
            id: doc.id as string,
            isFollow: followers as boolean,
            name: doc.data().name as string,
            photoURL: doc.data().photoURL as string
          }
        })
        const datas = await Promise.all(_datas)
        if (mounted.current) {
          _setFetchUsers([...datas])
          _setIsUserLoading(false)
        }
      })
  }

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
  const fetchUserData = (): UserData | undefined => {
    return _fetchUser
  }

  /**
   * DBからログイン中のユーザー以外の取得したユーザーデータを返す
   */
  const fetchUsersData = (): UserData[] | undefined => {
    return _fetchUsers
  }

  return {
    _isUserLoading,
    fetchUserData,
    fetchUsersData
  }
}
