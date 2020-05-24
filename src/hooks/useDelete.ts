import firebase from '../model/_shared/firebase'

//----------------------------------
// interface
//----------------------------------
export interface Delete {
  onDeleteUser: () => Promise<void>
}

//----------------------------------
// hooks
//----------------------------------
export const useDelete = (): Delete => {
  /**
   * ユーザーを削除する
   */
  const deleteUser = async (): Promise<void> => {
    const batch = firebase.firestore().batch()

    const usersRef = firebase
      .firestore()
      .doc(`users/${firebase.auth().currentUser?.uid}`)

    const socialRef = firebase
      .firestore()
      .doc(`social/${firebase.auth().currentUser?.uid}`)

    const postsDocs = await firebase
      .firestore()
      .collection('posts')
      .where('authorId', '==', firebase.auth().currentUser?.uid)
      .get()

    batch.delete(usersRef)
    batch.delete(socialRef)
    postsDocs.docs.forEach(doc => {
      batch.delete(doc.ref)
    })

    await batch.commit()
    // 最後にアカウントを削除する
    await firebase.auth().currentUser?.delete()
  }

  /**
   * ユーザーを削除するハンドラー
   */
  const onDeleteUser = async (): Promise<void> => {
    await deleteUser()
  }

  return {
    onDeleteUser
  }
}
