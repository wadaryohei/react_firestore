import { useEffect, useState } from 'react'
import { functions } from '../model/_shared/functions'
import { fromUserType, toUserType } from '../model/User/types'
import fireModel from '../model/_shared/fireModel'

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
  const isFollowingSnapShot = (): (() => void) => {
    const followingRef = fireModel.subDocRef(
      `social/${otherUserId}/followers/${userId}`
    )
    return followingRef.onSnapshot(snap => {
      snap.exists ? setFollowing(true) : setFollowing(false)
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
    const fromUserDoc = await fireModel.doc(`users/${userId}`) // ログイン中の自分
    const toUserDoc = await fireModel.doc(`users/${otherUserId}`) // 自分以外

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
    const fromUserDoc = await fireModel.doc(`users/${userId}`) // ログイン中の自分
    const toUserDoc = await fireModel.doc(`users/${otherUserId}`) // 自分以外

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
