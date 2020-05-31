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
    await callUserDelete()
    await firebase.auth().signOut()
    _setDeleteLoading(false)
  }

  /**
   * ローディング状態を返す
   */
  const deleteLoading = (): boolean => {
    return _deleteLoading
  }

  /**
   * cloud functionsからユーザーを削除する
   */
  const callUserDelete = async (): Promise<void> => {
    const userDeleteFunc = firebase.functions().httpsCallable('userDelete')
    await userDeleteFunc().catch(e => {
      console.log(e)
    })
  }

  return {
    onDeleteUser,
    deleteLoading
  }
}
