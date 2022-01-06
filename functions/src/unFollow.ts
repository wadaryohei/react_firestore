import * as firebaseFunctions from 'firebase-functions'
import * as admin from 'firebase-admin'
const functions = firebaseFunctions.region('asia-northeast1')

/**
 * ユーザーのアンフォロー時の処理
 */
export const unFollow = functions.https.onCall(async (data, context) => {
  // バッチ処理を準備
  const batch = admin.firestore().batch()

  // フォローする側とフォローされる側のuserIdを取得
  const toUserId = data.toUserId
  const fromUserId = data.fromUserId

  // フォローする側は自分のfollowingに相手の情報を入れる
  // フォローされる側は相手の情報を自分のfollowerに入れる
  const followingsRef = admin.firestore().doc('socials/v1').collection('users').doc(fromUserId).collection('followings').doc(toUserId)

  // followers
  const followersRef = admin.firestore().doc('socials/v1').collection('users').doc(toUserId).collection('followers').doc(fromUserId)

  // それぞれのドキュメントを削除する
  batch.delete(followingsRef)
  batch.delete(followersRef)

  // バッチ処理をコミット
  await batch.commit()

  return { data: data, auth: context.auth }
})
