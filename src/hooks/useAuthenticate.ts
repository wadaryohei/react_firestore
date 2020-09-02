import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Routing } from '../const/Routing'
import FireModel from '../model/_shared/fireModel'
import { useLoad, useLoadType } from './useLoad'

//----------------------------------
// type
//----------------------------------
export interface useAuthenticateType {
  firebaseUser: firebase.User | null
  loading: useLoadType
}

//----------------------------------
// hooks
//----------------------------------
export const useAuthenticate = (): useAuthenticateType => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null)
  const loading = useLoad(true)
  const mounted = useRef(true)
  const history = useHistory()
  const fireModel = new FireModel()

  /**
   * ユーザーのドキュメントが存在するか確認する
   */
  const findUser = async (
    uid: string | undefined
  ): Promise<firebase.firestore.DocumentSnapshot | undefined> => {
    const profilesPath = await fireModel
      .baseReference('profiles')
      .doc(uid)
      .get()
    // ドキュメントが存在するかチェック
    if (profilesPath?.exists) {
      return profilesPath
    }
    return
  }

  /**
   * 初期ログイン時ユーザーが存在しなければユーザー情報をDBに保存する
   */
  const writeUser = async (user: firebase.User | null) => {
    // ユーザーが存在しないのでDBにユーザー情報をWrite
    if (user) {
      const profilesPath = fireModel.baseReference('profiles').doc(user?.uid)
      await profilesPath.set(
        {
          uid: user?.uid,
          name: user?.displayName,
          photoURL: user?.photoURL,
          createdAt: firebase.firestore.Timestamp.now(),
          updatedAt: firebase.firestore.Timestamp.now()
        },
        { merge: true }
      )
    }
  }

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      const result = await firebase.auth().getRedirectResult()
      try {
        if (result.credential) {
          const theUser = await findUser(result.user?.uid)
          if (!theUser) {
            await writeUser(result.user)
          }
          history.push(Routing.home)
        }
      } catch (e) {
        alert('ユーザ認証でエラーが発生しました。')
        history.push(Routing.signIn)
      }

      if (mounted.current) {
        if (!user) history.push(Routing.signIn)
        setFirebaseUser(user ? user : null)
        loading.onLoadEnd()
      }
    })

    return () => {
      unsubscribe()
      mounted.current = false
    }
    // eslint-disable-next-line
  }, [])

  return { firebaseUser, loading }
}
