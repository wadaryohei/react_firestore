const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * ユーザーのアンフォロー時のフォローフォロワー数をカウントする関数
 */
module.exports = functions.https.onCall(async (data, context) => {
  // バッチ処理を準備
  const batch = admin.firestore().batch()

  // フォローする側とフォローされる側のuserIdを取得
  const followeredId = data.followeredId
  const followingId = data.followingId

  // フォローする側とフォローされる側のUserコレクションを準備
  const userFolloweredRef = admin.firestore().doc(`users/${followeredId}`)
  const userFollowingRef = admin.firestore().doc(`users/${followingId}`)

  // 自分のフォローしている人のfollowingカウントを取り消す
  batch.update(userFollowingRef, {
    followingCount: admin.firestore.FieldValue.increment(-1)
  })

  // 自分がフォローした人のfollowerカウントを取り消す
  batch.update(userFolloweredRef, {
    followerCount: admin.firestore.FieldValue.increment(-1)
  })

  // バッチ処理をコミット
  await batch.commit()

  return { data: data, auth: context.auth }
})
