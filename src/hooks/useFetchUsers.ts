import { useState, useEffect, useRef } from 'react'
import { UserType } from '../model/User/types'
import firebase from '../model/_shared/firebase'

//----------------------------------
// init
//----------------------------------
export const initUserType: UserType = {
  id: '',
  name: '',
  followerCount: 0,
  followingCount: 0,
  photoURL: ''
}

//----------------------------------
// type
//----------------------------------
export interface userFetchUsersType {
  fetchUserData: () => UserType
}

//----------------------------------
// hooks
//----------------------------------
export const useFetchUsers = (
  collection: string,
  uid: string | undefined
): userFetchUsersType => {
  const [_fetchUser, _setFetchUser] = useState<UserType>(initUserType)
  const mount = useRef<boolean>(true)

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const userUnsubscribe = userSnapShot(collection, uid)

    return () => {
      mount.current = false
      userUnsubscribe()
    }
  }, [collection, uid])

  /**
   * fireStoreからユーザーを取得する
   */
  const userSnapShot = (
    collection: string,
    uid: string | undefined
  ): (() => void) => {
    // onSnapShotで取得したいcollection先
    const collectionDoc = firebase
      .firestore()
      .collection(collection)
      .doc(uid)
    const followersDoc = firebase
      .firestore()
      .collection('social')
      .doc(uid)
      .collection('followers')
    const followingsDoc = firebase
      .firestore()
      .collection('social')
      .doc(uid)
      .collection('followings')

    // コレクションをonSnapShotで監視してusersデータにする
    return collectionDoc.onSnapshot(snap => {
      followersDoc.onSnapshot(followersSnap => {
        followingsDoc.onSnapshot(followingsSnap => {
          const _datas = {
            id: snap.id,
            name: snap.data()?.name as string,
            followerCount: followersSnap.size as number,
            followingCount: followingsSnap.size as number,
            photoURL: snap.data()?.photoURL as string
          }

          if (mount.current) {
            _setFetchUser(_datas)
          }
        })
      })
    })
  }

  /**
   * DBから取得したユーザーデータを返す
   */
  const fetchUserData = (): UserType => {
    return _fetchUser
  }

  return {
    fetchUserData
  }
}
