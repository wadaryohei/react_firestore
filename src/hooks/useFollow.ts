import firebase from '../model/_shared/firebase'
import { UserType } from '../model/User/types'
import { useEffect, useState, useRef } from 'react'

//----------------------------------
// type
//----------------------------------
export interface useFollowType {
  follow: (
    followerId: string | undefined,
    otherUser: UserType | undefined
  ) => void
  unFollow: (
    followerId: string | undefined,
    profle: UserType | undefined
  ) => void
  isFollowing: () => boolean
}

//----------------------------------
// hooks
//----------------------------------
export const useFollow = (
  uid: string | undefined,
  otherUserId: string | undefined
): useFollowType => {
  const [_isFollowing, setFollowing] = useState<boolean>(false)
  const mounted = useRef(true)

  //----------------------------------
  // useEffect
  //----------------------------------
  useEffect(() => {
    const unsubscribe = isFollowingSnapShot()

    return () => {
      unsubscribe()
      // mounted.current = false
    }
  })

  /**
   * ログイン中のユーザーが他ユーザーをフォローしているかどうか
   */
  const isFollowingSnapShot = (): () => void => {
    return firebase
    .firestore()
    .doc(`social/${uid}`)
    .collection('following')
    .doc(uid)
    .onSnapshot(snap => {
      if (snap.exists) {
        if (otherUserId !== undefined) {
          setFollowing(snap.data()?.[otherUserId])
          return snap.data()?.[otherUserId]
        }
      }
    })
  }

  /**
   * ログイン中のユーザーが他人のユーザーをフォローしているか
   */
  const isFollowing = (): boolean => {
    return _isFollowing
  }

  /**
   * フォローをするときの処理
   */
  const follow = (
    followerId: string | undefined,
    userId: UserType | undefined
  ): void => {
    console.log(`Follow ${userId?.id}`)

    const batch = firebase.firestore().batch()

    callFollowCount(userId?.id, followerId)

    const followersRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('followers')
      .doc(userId?.id)

    const followingRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('following')
      .doc(followerId)

    batch.set(
      followersRef,
      {
        [followerId as string]: true,
        name: userId?.name,
        photoURL: userId?.photoURL,
        createdAt: firebase.firestore.Timestamp.now(),
        updatedAt: firebase.firestore.Timestamp.now()
      },
      { merge: true }
    )

    batch.set(
      followingRef,
      {
        [userId?.id as string]: true
      },
      { merge: true }
    )

    batch.commit()
  }

  /**
   * フォローを外すときの処理
   */
  const unFollow = (
    followerId: string | undefined,
    user: UserType | undefined
  ): void => {
    console.log(`unFollow ${user?.id}`)

    const batch = firebase.firestore().batch()

    callUnFollowCount(user?.id, followerId)

    const followersRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('followers')
      .doc(user?.id)

    const followingRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('following')
      .doc(followerId)

    batch.delete(followersRef)
    batch.update(followingRef, {
      [user?.id as string]: firebase.firestore.FieldValue.delete()
    })

    batch.commit()
  }

  /**
   * ユーザーのフォロー時のフォロー・フォロワー数をカウント
   * @function userFollowCount functionsからフォロー・フォロワー数をカウントする
   */
  const callFollowCount = async (
    followeredId: string | undefined,
    followingId: string | undefined
  ): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const userFollowCountFunc = firebase
      .functions()
      .httpsCallable('followCount')
    await userFollowCountFunc({followeredId: followeredId, followingId: followingId }).catch(e => {
      console.log(e)
    })
  }

  /**
   * ユーザーのアンフォロー時のフォロー・フォロワー数をカウント
   * @function userUnFollowCount functionsからフォロー・フォロワー数をカウントする
   */
  const callUnFollowCount = async (
    followeredId: string | undefined,
    followingId: string | undefined
  ): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const userUnFollowCountFunc = firebase.functions().httpsCallable('unFollowCount')
    await userUnFollowCountFunc({followeredId: followeredId, followingId: followingId}).catch(e => {
      console.log(e)
    })
  }

  return { follow, unFollow, isFollowing }
}
