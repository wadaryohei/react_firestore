import { useEffect, useState, useCallback } from 'react'
import firebase from '../model/_shared/firebase'
import { functions } from '../model/_shared/functions'
import { fromUserType, toUserType } from '../model/User/types'
import { FireModel } from '../model/_shared/FireModel'

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

  /**
   * ログイン中のユーザーが他ユーザーをフォローしているかどうか
   */
  const isFollowingSnapShot = useCallback((): (() => void) => {
    return firebase
      .firestore()
      .collection('social')
      .doc(otherUserId)
      .collection('followers')
      .doc(userId)
      .onSnapshot(snap => {
        snap.exists ? setFollowing(true) : setFollowing(false)
      })
  }, [otherUserId, userId])

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
    const fromUserModel = new FireModel(`users/${userId}`)
    const toUserModel = new FireModel(`users/${otherUserId}`)

    const fromUserDoc = await fromUserModel.getDocumentDatas() // ログイン中の自分
    const toUserDoc = await toUserModel.getDocumentDatas() // 自分以外

    // フォローする側のデータ
    const fromUser: fromUserType = {
      userId: fromUserDoc?.id,
      userDoc: {
        name: fromUserDoc?.data()?.name,
        photoURL: fromUserDoc?.data()?.photoURL
      }
    }

    // フォローされる側のデータ
    const toUser: toUserType = {
      userId: toUserDoc?.id,
      userDoc: {
        name: toUserDoc?.data()?.name,
        photoURL: toUserDoc?.data()?.photoURL
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
    const fromUserModel = new FireModel(`users/${userId}`)
    const toUserModel = new FireModel(`users/${otherUserId}`)

    const fromUserDoc = await fromUserModel.getDocumentDatas() // ログイン中の自分のデータ
    const toUserDoc = await toUserModel.getDocumentDatas() // 自分以外のデータ

    // フォローされる側とフォローする側のデータ
    const fromUserId = fromUserDoc?.id
    const toUserId = toUserDoc?.id

    if (fromUserId && toUserId) {
      await callUnFollow(fromUserId, toUserId)
    }
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
    fromUserId: string,
    toUserId: string
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

  //----------------------------------
  // useEffect
  //----------------------------------
  useEffect(() => {
    const unsubscribe = isFollowingSnapShot()

    return () => {
      unsubscribe()
    }
  }, [isFollowingSnapShot])

  return { follow, unFollow, isFollowing }
}
