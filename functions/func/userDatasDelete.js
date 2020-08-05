const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * ユーザーが削除されたとき関連データを全削除する
 */
module.exports = functions.auth.user().onDelete(async user => {

  const batch = admin.firestore().batch()

  //----------------------------------
  // 削除したいRefPathを取得
  //----------------------------------
  // UserRef
  const usersRef = admin.firestore().doc(`users/${user.uid}`)

  // SocialRef
  const socialRef = admin.firestore().doc(`social/${user.uid}`)

  //----------------------------------
  // Doc毎に削除が必要なものを取得する
  //----------------------------------
  // followersDocs
  const followersDocs = await admin.firestore().collectionGroup('followers').where('uid', '==', user.uid).get()

  // followingsDocs
  const followingsDocs = await admin.firestore().collectionGroup('followings').where('deleteId', '==', user.uid).get()

  // otherFollowingsDocs
  const otherFollowingsDocs = await admin.firestore().collectionGroup('followings').where('uid', '==', user.uid).get()

  // PostsDocs
  const postsDocs = await admin.firestore().collection('posts').where('authorId', '==', user.uid).get()

  //----------------------------------
  // バッチ処理で一括削除する
  //----------------------------------
  postsDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  followersDocs.docs.forEach((doc) => {
    batch.delete(doc.ref)
  })

  followingsDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  otherFollowingsDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  batch.delete(usersRef)
  batch.delete(socialRef)

  await batch.commit()
})