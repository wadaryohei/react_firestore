import firebase from '../model/_shared/firebase'
import { UserData } from '../model/Datas/User/types'

//----------------------------------
// interface
//----------------------------------
export interface useFollowProps {
  follow: (
    followerId: string | undefined,
    otherUser: UserData | undefined
  ) => void
  unFollow: (
    followerId: string | undefined,
    profle: UserData | undefined
  ) => void
}

//----------------------------------
// hooks
//----------------------------------
export const useFollow = (): useFollowProps => {
  /**
   * フォローをするときの処理
   */
  const follow = (
    followerId: string | undefined,
    userId: UserData | undefined
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
    user: UserData | undefined
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
      .httpsCallable('userFollowCount')
    await userFollowCountFunc({
      followeredId: followeredId,
      followingId: followingId
    }).catch(e => {
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
    const userUnFollowCountFunc = firebase
      .functions()
      .httpsCallable('userUnFollowCount')
    await userUnFollowCountFunc({
      followeredId: followeredId,
      followingId: followingId
    }).catch(e => {
      console.log(e)
    })
  }

  return { follow, unFollow }
}
