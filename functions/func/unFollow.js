const functions = require('firebase-functions').region('asia-northeast1')
const admin = require('firebase-admin')

/**
 * ユーザーのアンフォロー時の処理
 */
module.exports = functions.https.onCall(async (data, context) => {
  // バッチ処理を準備
  const batch = admin.firestore().batch()

  // フォローする側とフォローされる側のuserIdを取得
  const toUserId = data.toUserId
  const fromUserId = data.fromUserId

  // フォローする側は自分のfollowingに相手の情報を入れる
  // フォローされる側は相手の情報を自分のfollowerに入れる
  const followingsRef = admin.firestore().doc(`social/${fromUserId}`).collection('followings').doc(toUserId) // followings
  const followersRef = admin.firestore().doc(`social/${toUserId}`).collection('followers').doc(fromUserId) // followers

  // それぞれのドキュメントを削除する
  batch.delete(followingsRef)
  batch.delete(followersRef)

  // バッチ処理をコミット
  await batch.commit()

  return { data: data, auth: context.auth }
})