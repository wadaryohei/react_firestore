import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef, useCallback } from 'react'
import { UserPostsData } from '../model/Datas/UserPostsData'

//----------------------------------
// interface
//----------------------------------
interface FetchPosts {
  fetchUserPostData: () => UserPostsData[] | undefined
}

//----------------------------------
// hooks
//----------------------------------
export const useFetchPosts = (
  collection: string,
  user: firebase.User | null
): FetchPosts => {
  const [_fetchPostData, _setFetchPostData] = useState<UserPostsData[]>([])
  const mounted = useRef(true)

  /**
   * fireStoreからユーザー情報をonSnapShotでリアルタイムに取得する
   */
  const fetchUserPostonSnapShot = useCallback((): (() => void) => {
    return firebase
      .firestore()
      .collection(collection)
      .where('authorId', '==', user?.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        const snapDocs = snap.docs.map(doc => {
          return {
            docId: doc.id,
            authorId: doc.data().authorId as string,
            postBody: doc.data().postBody as string
          }
        })
        if (mounted.current) {
          _setFetchPostData(snapDocs)
        }
      })
  }, [collection, user])
  /**
   * DBから取得したポストデータを返す
   */
  const fetchUserPostData = (): UserPostsData[] | undefined => {
    return _fetchPostData
  }

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    /**
     * ログイン中のユーザー（自分自身の）ポスト情報をpostコレクションのauthorIdから抽出
     */
    const unsubscribe = fetchUserPostonSnapShot()

    return () => {
      mounted.current = false
      unsubscribe()
    }
  }, [collection, user, fetchUserPostonSnapShot])

  return {
    fetchUserPostData
  }
}
