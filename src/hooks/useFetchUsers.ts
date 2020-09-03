import { useState, useEffect, useRef } from 'react'
import { UserType } from '../model/User/types'
import FireModel from '../model/_shared/fireModel'

//----------------------------------
// type
//----------------------------------
export interface userFetchUsersType {
  fetchUserData: () => UserType | undefined
}

//----------------------------------
// hooks
//----------------------------------
export const useFetchUsers = (uid: string | undefined): userFetchUsersType => {
  const [_fetchUser, _setFetchUser] = useState<UserType>()
  const mount = useRef<boolean>(true)
  const fireModel = new FireModel()

  /**
   * fireStoreからユーザーを取得する
   */
  const userSnapShot = (uid: string | undefined): (() => void) => {
    // onSnapShotで取得したいcollection先
    const profilesRef = fireModel.baseReference('profiles').doc(uid)
    const followersRef = fireModel
      .baseReference('socials')
      .doc(uid)
      .collection('followers')
    const followingsRef = fireModel
      .baseReference('socials')
      .doc(uid)
      .collection('followings')

    // コレクションをonSnapShotで監視してusersデータにする
    return profilesRef.onSnapshot(snap => {
      followersRef.onSnapshot(followersSnap => {
        followingsRef.onSnapshot(followingsSnap => {
          const _datas = {
            id: snap.data()?.uid,
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
  const fetchUserData = (): UserType | undefined => {
    return _fetchUser
  }

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const userUnsubscribe = userSnapShot(uid)

    return () => {
      mount.current = false
      userUnsubscribe()
    }
    // eslint-disable-next-line
  }, [])

  return {
    fetchUserData
  }
}
