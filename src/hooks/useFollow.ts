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

  return { follow, unFollow }
}
