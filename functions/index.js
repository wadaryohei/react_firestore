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

/**
 * ユーザーのフォロー時のフォローフォロワー数をカウントする関数
 */
exports.userFollowCount = functions.https.onCall(async (data, context) => {
  // バッチ処理を準備
  const batch = admin.firestore().batch()

  // フォローする側とフォローされる側のuserIdを取得
  const followeredId = data.followeredId
  const followingId = data.followingId

  // フォローする側とフォローされる側のUserコレクションを準備
  const userFolloweredRef = admin.firestore().doc(`users/${followeredId}`)
  const userFollowingRef = admin.firestore().doc(`users/${followingId}`)

  // 自分のフォローしている人のfollowingカウントをアップする
  batch.update(userFollowingRef, {
    followingCount: admin.firestore.FieldValue.increment(1)
  })

  // 自分がフォローした人のfollowerカウントをアップする
  batch.update(userFolloweredRef, {
    followerCount: admin.firestore.FieldValue.increment(1)
  })

  // バッチ処理をコミット
  await batch.commit()
})

/**
 * ユーザーのアンフォロー時のフォローフォロワー数をカウントする関数
 */
exports.userUnFollowCount = functions.https.onCall(async (data, context) => {
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
})
