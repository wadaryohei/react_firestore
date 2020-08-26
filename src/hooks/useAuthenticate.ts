import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FireModel } from '../model/_shared/FireModel'

//----------------------------------
// type
//----------------------------------
export interface useAuthenticateType {
  firebaseUser: firebase.User | null
  loading: boolean
}

//----------------------------------
// hooks
//----------------------------------
export const useAuthenticate = (): useAuthenticateType => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const mounted = useRef(true)
  const history = useHistory()

  /**
   * ユーザーのドキュメントが存在するか確認する
   */
  const findUser = useCallback(async (uid: string): Promise<
    firebase.firestore.DocumentSnapshot | undefined
  > => {
    const userModel = new FireModel(`users/${uid}`)
    const userDoc = await userModel.getDocumentDatas()
    // ドキュメントが存在するかチェック
    if (userDoc?.exists) {
      return userDoc
    }
    return
  }, [])

  /**
   * 初期ログイン時ユーザーが存在しなければユーザー情報をDBに保存する
   */
  const writeUser = useCallback(async (user: firebase.User | null) => {
    // ユーザーが存在しないのでDBにユーザー情報をWrite
    await firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .set(
        {
          name: user?.displayName,
          photoURL: user?.photoURL,
          createdAt: firebase.firestore.Timestamp.now(),
          updatedAt: firebase.firestore.Timestamp.now()
        },
        { merge: true }
      )
  }, [])

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      const result = await firebase.auth().getRedirectResult()

      try {
        if (result.credential && result?.user?.uid) {
          const theUser = await findUser(result.user.uid)
          if (!theUser) await writeUser(result.user)
          history.replace('/')
        }
      } catch (e) {
        alert(`${e} ユーザ認証でエラーが発生しました。`)
      }

      if (mounted.current) {
        if (!user) history.replace('/signin')
        setFirebaseUser(user ? user : null)
        setLoading(false)
      }
    })

    return () => {
      mounted.current = false
      unsubscribe()
    }
  }, [findUser, history, writeUser])

  return { firebaseUser, loading }
}
