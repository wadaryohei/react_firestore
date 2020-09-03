import * as firebaseFunctions from 'firebase-functions'
import * as admin from 'firebase-admin'
const functions = firebaseFunctions.region('asia-northeast1')

/**
 * ユーザーが削除されたとき関連データを全削除する
 */
export const userDatasDelete = functions.auth.user().onDelete(async user => {
  const batch = admin.firestore().batch()

  //----------------------------------
  // 削除したいRefPathを取得
  //----------------------------------
  // UserRef
  const profilesRef = admin
    .firestore()
    .doc(`profiles/v1`)
    .collection('users')
    .doc(user.uid)

  // SocialRef
  const socialsRef = admin
    .firestore()
    .doc(`socials/v1`)
    .collection('users')
    .doc(user.uid)

  //----------------------------------
  // Doc毎に削除が必要なものを取得する
  //----------------------------------
  // followingsDocs
  const followingsDocs = await socialsRef.collection('followings').get()

  // followwersDocs
  const followersDocs = await socialsRef.collection('followers').get()

  // otherUsersFollowingsDocs
  const otherUsersFollowersDocs = await admin
    .firestore()
    .collectionGroup('followers')
    .where('followersId', '==', user.uid)
    .get()

  // otherUsersFollowingsDocs
  const otherUsersFollowingsDocs = await admin
    .firestore()
    .collectionGroup('followings')
    .where('followingsId', '==', user.uid)
    .get()

  // PostsDocs
  const postsDocs = await admin
    .firestore()
    .doc('posts/v1')
    .collection('users')
    .where('authorId', '==', user.uid)
    .get()
  //----------------------------------
  // バッチ処理で一括削除する
  //----------------------------------
  batch.delete(profilesRef)
  batch.delete(socialsRef)

  followersDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  followingsDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  otherUsersFollowersDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  otherUsersFollowingsDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  postsDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  await batch.commit()
})
