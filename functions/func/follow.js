const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * ユーザーのフォロー時の処理
 */
module.exports = functions.https.onCall(async (data, context) => {
  // バッチ処理を準備
  const batch = admin.firestore().batch()

  // フォローする側とフォローされる側のuserIdを取得
  const fromUser = data.fromUser
  const toUser = data.toUser

  // フォローする側は自分のfollowingに相手の情報を入れる
  // フォローされる側は相手の情報を自分のfollowerに入れる
  const followingsRef = admin.firestore().doc(`social/${fromUser.userId}`).collection('followings').doc(toUser.userId) // followings
  const followersRef = admin.firestore().doc(`social/${toUser.userId}`).collection('followers').doc(fromUser.userId) // followers

  // フォローされる側の情報を自分のfollowingに入れる
  batch.set(
    followingsRef,
    {
      uid: toUser.userId,
      deleteId: fromUser.userId,
      name: toUser.userDoc.name,
      photoURL: toUser.userDoc.photoURL,
    },
    { merge: true }
  )

  // フォローする側の情報を相手のfollowerに入れる
  batch.set(
    followersRef,
    {
      uid: fromUser.userId,
      name: fromUser.userDoc.name,
      photoURL: fromUser.userDoc.photoURL,
    },
    { merge: true }
  )

  // バッチ処理をコミット
  await batch.commit()

  return { data: data, auth: context.auth }
})