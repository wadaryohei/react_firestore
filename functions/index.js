const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

/**
 * ユーザーを削除するFunction
 */
exports.userDelete = functions.https.onCall(async (data, context) => {
  await admin
    .auth()
    .deleteUser(context.auth.uid)
    .then(result => {
      return {
        context: context.auth,
        data: data,
        result: result
      }
    })
    .catch(e => {
      console.log(e)
    })
})

/**
 * ユーザーが削除されたとき関連データを全削除する
 */
exports.userDatasDelete = functions.auth.user().onDelete(async user => {
  // バッチ処理を準備
  const batch = admin.firestore().batch()

  // Userコレクション
  const usersRef = admin.firestore().doc(`users/${user.uid}`)

  // Socialコレクション
  const socialRef = admin.firestore().doc(`social/${user.uid}`)

  // Followersドキュメント
  const followersDocs = await admin
    .firestore()
    .doc(`social/${user.uid}`)
    .collection('followers')
    .where(`${user.uid}`, '==', true)
    .get()

  // Followingコレクション
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
