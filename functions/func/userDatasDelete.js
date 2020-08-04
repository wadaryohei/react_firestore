const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * ユーザーが削除されたとき関連データを全削除する
 */
module.exports = functions.auth.user().onDelete(async user => {
  // バッチ処理を準備
  const batch = admin.firestore().batch()

  // UserRef
  const usersRef = admin.firestore().doc(`users/${user.uid}`)

  // SocialRef
  const socialRef = admin.firestore().doc(`social/${user.uid}`)

  // FollowingRef
  const followingRef = admin
    .firestore()
    .doc(`social/${user.uid}`)
    .collection('following')
    .doc(`${user.uid}`)

  // Postsドキュメント
  const postsDocs = await admin
    .firestore()
    .collection('posts')
    .where('authorId', '==', user.uid)
    .get()

  // Followersドキュメント
  const followersDocs = await admin
    .firestore()
    .doc(`social/${user.uid}`)
    .collection('followers')
    .where(`${user.uid}`, '==', true)
    .get()

  // Followingドキュメント
  const followingDoc = await admin
    .firestore()
    .doc(`social/${user.uid}`)
    .collection('following')
    .doc(`${user.uid}`)
    .get()

  // バッチ処理で一括削除する
  batch.delete(usersRef)
  batch.delete(socialRef)
  batch.delete(followingRef)
  followersDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })
  postsDocs.docs.forEach(doc => {
    batch.delete(doc.ref)
  })

  // バッチ処理をコミット
  await batch.commit()
})