import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

//----------------------------------
// interface
//----------------------------------
export interface useAuthenticateProps {
  firebaseUser: firebase.User | null
  loading: boolean
}

//----------------------------------
// hooks
//----------------------------------
export const useAuthenticate = (): useAuthenticateProps => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const mounted = useRef(true)
  const history = useHistory()

  console.log('App')

  /**
   * ユーザーのドキュメントが存在するか確認する
   */
  const findUser = useCallback(async (uid: string | undefined): Promise<
    firebase.firestore.DocumentSnapshot | undefined
  > => {
    const userDoc = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
    // ドキュメントが存在するかチェック
    if (userDoc.exists) return userDoc
    return
  }, [])

  /**
   * 初期ログイン時ユーザーが存在しなければユーザー情報をDBに保存する
   */
  const writeUser = useCallback(async (user: firebase.User | null) => {
    // ユーザーが存在しないのでDBにユーザー情報をWrite
    if (user) {
      await firebase
        .firestore()
        .collection('users')
        .doc(user?.uid)
        .set(
          {
            name: user?.displayName,
            photoURL: user?.photoURL,
            followerCount: 0,
            followingCount: 0,
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now()
          },
          { merge: true }
        )
    }
  }, [])

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      const result = await firebase.auth().getRedirectResult()
      if (result.credential) {
        const theUser = await findUser(result.user?.uid)
        if (!theUser) {
          await writeUser(result.user)
        }
        history.replace('/home')
      }

      setLocation(user ? user : null)
      setUser(user ? user : null)
      setLoader(false)
    })

    return () => {
      mounted.current = false
      unsubscribe()
    }
    // eslint-disable-next-line
  }, [])

  /**
   * ユーザーをセットする関数
   */
  const setUser = useCallback((user: firebase.User | null): void => {
    if (mounted.current) setFirebaseUser(user ? user : null)
  }, [])

  /**
   * ローディング状態をセットする関数
   */
  const setLoader = useCallback((loading: boolean): void => {
    if (mounted.current) setLoading(loading)
  }, [])

  /**
   * ユーザーが存在するかしないかを判定してリダイレクトする関数
   */
  const setLocation = useCallback(
    (user: firebase.User | null): void => {
      if (mounted.current) {
        if (!user) {
          history.replace('/signin')
        }
      }
    },
    [history]
  )

  return { firebaseUser, loading }
}
