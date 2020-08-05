import { useEffect, useState } from 'react'
import firebase from '../model/_shared/firebase'
import { fromUserType, toUserType } from '../model/User/types'

//----------------------------------
// type
//----------------------------------
export interface useFollowType {
  follow: (
    userId: string | undefined,
    otherUser: string | undefined
  ) => void
  unFollow: (
    userId: string | undefined,
    otherUser: string | undefined
  ) => void
  isFollowing: () => boolean
}

//----------------------------------
// hooks
//----------------------------------
export const useFollow = (
  userId: string | undefined,
  otherUserId: string | undefined
): useFollowType => {
  const [_isFollowing, setFollowing] = useState<boolean>(false)

  //----------------------------------
  // useEffect
  //----------------------------------
  useEffect(() => {
    const unsubscribe = isFollowingSnapShot()

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line
  },[])

  /**
   * ログイン中のユーザーが他ユーザーをフォローしているかどうか
   */
  const isFollowingSnapShot = (): () => void => {
    return firebase
      .firestore()
      .collection('social')
      .doc(otherUserId)
      .collection('followers')
      .doc(userId)
      .onSnapshot((snap) => {
        snap.exists? setFollowing(true) : setFollowing(false)
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
  const follow = async (
    userId: string | undefined,
    otherUserId: string | undefined
  ): Promise<void> => {
    console.log(`Follow ${otherUserId}`)

    // フォローする側とフォローされる側のusersドキュメントを取得
    const fromUserDoc = await firebase.firestore().collection('users').doc(userId).get() // ログイン中の自分
    const toUserDoc = await firebase.firestore().collection('users').doc(otherUserId).get() // 自分以外

    // フォローする側のデータ
    const fromUser: fromUserType = {
      userId: fromUserDoc.id,
      userDoc: {
        name: fromUserDoc.data()?.name,
        photoURL: fromUserDoc.data()?.photoURL
      }
    }

    // フォローされる側のデータ
    const toUser: toUserType = {
      userId: toUserDoc.id,
      userDoc: {
        name: toUserDoc.data()?.name,
        photoURL: toUserDoc.data()?.photoURL
      }
    }

    await callFollow(fromUser, toUser)
  }

  /**
   * アンフォローをするときの処理
   */
  const unFollow = async (
    userId: string | undefined,
    otherUserId: string | undefined
  ): Promise<void> => {
    console.log(`unFollow ${otherUserId}`)

    // フォローする側とフォローされる側のusersドキュメントを取得
    const fromUserDoc = await firebase.firestore().collection('users').doc(userId).get() // ログイン中の自分
    const toUserDoc = await firebase.firestore().collection('users').doc(otherUserId).get() // 自分以外

    // フォローされる側とフォローする側のデータ
    const fromUserId: string | undefined = fromUserDoc.id
    const toUserId: string | undefined = toUserDoc.id

    await callUnFollow(fromUserId, toUserId)
  }

  /**
   * ユーザーのフォロー・フォロワー処理
   */
  const callFollow = async (fromUser: fromUserType, toUser: toUserType): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const callFollowFunc = firebase.functions().httpsCallable('follow')
    await callFollowFunc({ fromUser: fromUser, toUser: toUser }).catch(e => {
      console.log(e)
    })
  }


  /**
   * ユーザーのアンフォロー・アンフォロワー処理
   */
  const callUnFollow = async (fromUserId: string | undefined, toUserId: string | undefined): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const callUnFollowFunc = firebase.functions().httpsCallable('unFollow')
    await callUnFollowFunc({ fromUserId: fromUserId, toUserId: toUserId }).catch(e => {
      console.log(e)
    })
  }

  return { follow, unFollow, isFollowing }
}
