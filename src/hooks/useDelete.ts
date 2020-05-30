import firebase from '../model/_shared/firebase'
import { useState } from 'react'

//----------------------------------
// interface
//----------------------------------
export interface Delete {
  onDeleteUser: () => Promise<void>
  deleteLoading: () => boolean
}

//----------------------------------
// hooks
//----------------------------------
export const useDelete = (): Delete => {
  const [_deleteLoading, _setDeleteLoading] = useState<boolean>(false)

  /**
   * ユーザーを削除を実行するハンドラー
   */
  const onDeleteUser = async (): Promise<void> => {
    await deleteUser()
  }

  /**
   * ユーザーを削除するメソッド
   */
  const deleteUser = async (): Promise<void> => {
    /**
     * バッチ処理を予約 - 自分に関連するDBを全削除する
     * @todo ゆくゆくはFunctionでの一括削除に書き換える
     * 参考記事 https://firebase.google.com/products/extensions/delete-user-data?hl=ja
     */

    _setDeleteLoading(true)

    const batch = firebase.firestore().batch()

    // Userコレクション
    const usersRef = firebase
      .firestore()
      .doc(`users/${firebase.auth().currentUser?.uid}`)

    // Socialコレクション
    const socialRef = firebase
      .firestore()
      .doc(`social/${firebase.auth().currentUser?.uid}`)

    // Followersドキュメント
    const followersDocs = await firebase
      .firestore()
      .doc(`social/${firebase.auth().currentUser?.uid}`)
      .collection('followers')
      .where(`${firebase.auth().currentUser?.uid}`, '==', true)
      .get()

    // Followingコレクション
    const followingRef = firebase
      .firestore()
      .doc(`social/${firebase.auth().currentUser?.uid}`)
      .collection('following')
      .doc(`${firebase.auth().currentUser?.uid}`)

    // Postsドキュメント
    const postsDocs = await firebase
      .firestore()
      .collection('posts')
      .where('authorId', '==', firebase.auth().currentUser?.uid)
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
    await batch.commit()

    try {
      // 1.普通に削除処理を実行
      // 2.失敗したらlocalStorageからtokenを取得して再認証後に再度削除処理を実行
      // ３.tokenの有効期限が1時間なので再認証が失敗した場合は最終再ログインを促す
      await firebase.auth().currentUser?.delete()
      console.log('success the user deleted.')
      _setDeleteLoading(false)
    } catch (error) {
      console.log(error)
      try {
        /**
         * Providerから再認証する
         * ユーザー削除時にエラーで例外処理に入った場合ユーザーの再認証をする
         * @see https://firebase.google.com/docs/auth/web/manage-users?hl=ja#re-authenticate_a_user
         */
        await firebase
          .auth()
          .currentUser?.reauthenticateWithCredential(await reAuthProvider())
        await firebase.auth().currentUser?.delete()
        console.log('reAuth to success the user deleted.')
      } catch (error) {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().currentUser?.reauthenticateWithPopup(provider)
      }
      _setDeleteLoading(false)
    }
    localStorage.clear()
  }

  /**
   * ローディング状態を返す
   */
  const deleteLoading = (): boolean => {
    return _deleteLoading
  }

  /**
   * Providerから再認証する
   * 再ログインさせるのもアリだがstorageにtokenを保存して持ち回す
   * @see https://stackoverflow.com/questions/52249546/reauthenticating-firebase-user-with-google-provider-in-react
   */
  const reAuthProvider = async (): Promise<firebase.auth.OAuthCredential> => {
    const token = localStorage.getItem('token')
    const accessToken = JSON.parse(token!)
    const credential = firebase.auth.GoogleAuthProvider.credential(
      accessToken,
      null
    )
    console.log(credential)
    return credential
  }

  return {
    onDeleteUser,
    deleteLoading
  }
}
