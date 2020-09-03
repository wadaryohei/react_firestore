import { useEffect, useState, useRef } from 'react'
import { functions } from '../model/_shared/functions'
import { fromUserType, toUserType } from '../model/User/types'
import FireModel from '../model/_shared/fireModel'

//----------------------------------
// type
//----------------------------------
export interface useFollowType {
  follow: (userId: string | undefined, otherUser: string | undefined) => void
  unFollow: (userId: string | undefined, otherUser: string | undefined) => void
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
  const fireModel = new FireModel()
  const mounted = useRef(true)

  //----------------------------------
  // useEffect
  //----------------------------------
  useEffect(() => {
    const unsubscribe = isFollowingSnapShot()

    return () => {
      mounted.current = false
      unsubscribe()
    }
    // eslint-disable-next-line
  },[])

  /**
   * ログイン中のユーザーが他ユーザーをフォローしているかどうか
   */
  const isFollowingSnapShot = (): (() => void) => {
    const followingRef = fireModel
      .baseReference('socials')
      .doc(otherUserId)
      .collection('followers')
      .doc(userId)
    return followingRef.onSnapshot(snap => {
      if (mounted.current) {
        setFollowing(snap.exists ? true : false)
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
  const follow = async (
    userId: string | undefined,
    otherUserId: string | undefined
  ): Promise<void> => {
    // フォローする側とフォローされる側のusersドキュメントを取得

    const fromUserDoc = await fireModel
      .baseReference('profiles')
      .doc(userId)
      .get() // ログイン中の自分
    const toUserDoc = await fireModel
      .baseReference('profiles')
      .doc(otherUserId)
      .get() // 自分以外

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
    // フォローする側とフォローされる側のusersドキュメントを取得
    const fromUserDoc = await fireModel
      .baseReference('profiles')
      .doc(userId)
      .get() // ログイン中の自分
    const toUserDoc = await fireModel
      .baseReference('profiles')
      .doc(otherUserId)
      .get() // 自分以外

    // フォローされる側とフォローする側のデータ
    const fromUserId: string | undefined = fromUserDoc.id
    const toUserId: string | undefined = toUserDoc.id

    await callUnFollow(fromUserId, toUserId)
  }

  /**
   * ユーザーのフォロー・フォロワー処理
   */
  const callFollow = async (
    fromUser: fromUserType,
    toUser: toUserType
  ): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const callFollowFunc = functions.httpsCallable('follow')
    await callFollowFunc({ fromUser: fromUser, toUser: toUser }).catch(
      (e: any) => {
        console.log(e)
        alert('フォローに失敗しました')
      }
    )
  }

  /**
   * ユーザーのアンフォロー・アンフォロワー処理
   */
  const callUnFollow = async (
    fromUserId: string | undefined,
    toUserId: string | undefined
  ): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const callUnFollowFunc = functions.httpsCallable('unFollow')
    await callUnFollowFunc({
      fromUserId: fromUserId,
      toUserId: toUserId
    }).catch((e: any) => {
      console.log(e)
      alert('フォロー解除に失敗しました')
    })
  }

  return { follow, unFollow, isFollowing }
}
