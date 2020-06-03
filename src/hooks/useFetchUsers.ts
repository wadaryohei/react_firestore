import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef } from 'react'
import { UserData } from '../model/Datas/User/types'


//----------------------------------
// interface
//----------------------------------
export interface userFetchUsersProps {
  _isUserLoading: boolean
  fetchUser: (
    collection: string,
    user: firebase.User | null
  ) => Promise<void | undefined>
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
  const [_fetchOtherUsers, _setOtherFetchUsers] = useState<UserData[]>([])
  const [_isUserLoading, _setIsUserLoading] = useState<boolean>(true)
  const mounted = useRef(true)

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const init = async () => {
      // ユーザー情報を取得
      await fetchUser(collection, user)

      // ユーザー情報をonSnapShotでリアルタイム取得
      const unsubscribe = await usersSnapShot()

      // コンポーネントのアンマウント時にはonSnapShotをUnsubscribeする
      return () => {
        unsubscribe()
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
  const usersSnapShot = async (): Promise<() => void> => {
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
          _setOtherFetchUsers([...datas])
          _setIsUserLoading(false)
        }
      })
  }

  /**
   * fireStoreからユーザーを取得する
   */
  const fetchUser = async (
    collection: string,
    user: firebase.User | null
  ): Promise<void | undefined> => {
    const snapShot = firebase
      .firestore()
      .collection(collection)
      .doc(user?.uid)

    const docs = await snapShot.get()
    const _datas = {
      id: docs.id,
      name: docs.data()?.name as string,
      photoURL: docs.data()?.photoURL as string
    }
    if (mounted.current) {
      _setFetchUser(_datas)
    }
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
    return _fetchOtherUsers
  }

  return {
    _isUserLoading,
    fetchUser,
    fetchUserData,
    fetchUsersData
  }
}
