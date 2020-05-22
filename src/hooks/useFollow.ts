import firebase from '../model/_shared/firebase'
import { OtherUsersData } from '../model/Datas/OtherUsersData'

//----------------------------------
// interface
//----------------------------------
export interface Follow {
  follow: (
    followerId: string | undefined,
    otherUser: OtherUsersData | undefined
  ) => void
  unFollow: (
    followerId: string | undefined,
    profle: OtherUsersData | undefined
  ) => void
}

//----------------------------------
// hooks
//----------------------------------
export const useFollow = (): Follow => {
  /**
   * フォローをするときの処理
   */
  const follow = (
    followerId: string | undefined,
    otherUser: OtherUsersData | undefined
  ): void => {
    console.log(`Follow ${otherUser?.id}`)

    const batch = firebase.firestore().batch()

    const followersRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('followers')
      .doc(otherUser?.id)

    const followingRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('following')
      .doc(followerId)

    batch.set(
      followersRef,
      {
        [followerId as string]: true,
        name: otherUser?.name,
        photoURL: otherUser?.photoURL,
        createdAt: firebase.firestore.Timestamp.now(),
        updatedAt: firebase.firestore.Timestamp.now()
      },
      { merge: true }
    )

    batch.set(
      followingRef,
      {
        [otherUser?.id as string]: true
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
    profile: OtherUsersData | undefined
  ): void => {
    console.log(`unFollow ${profile?.id}`)

    const batch = firebase.firestore().batch()

    const followersRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('followers')
      .doc(profile?.id)

    const followingRef = firebase
      .firestore()
      .doc(`social/${followerId}`)
      .collection('following')
      .doc(followerId)

    batch.delete(followersRef)
    batch.update(followingRef, {
      [profile?.id as string]: firebase.firestore.FieldValue.delete()
    })

    batch.commit()
  }

  return { follow, unFollow }
}
