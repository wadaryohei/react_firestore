import firebase from '../model/_shared/firebase'
import { useState, useEffect, useRef, useCallback } from 'react'
import dayjs from 'dayjs'
import { PostsData } from '../model/Datas/Post/type'

//----------------------------------
// interface
//----------------------------------
export interface useFetchPostsProps {
  fetchPostDatas: () => PostsData[] | undefined
}

//----------------------------------
// hooks
//----------------------------------
export const useFetchPosts = (
  collection: string,
  user: firebase.User | null
): useFetchPostsProps => {
  const [_fetchPostDatas, _setFetchPostDatas] = useState<PostsData[]>([])
  const mounted = useRef(true)

  /**
   * 全ユーザーのPostsを取得する
   */
  const fetchPostsOnSnapShot = useCallback((): (() => void) => {
    return firebase
      .firestore()
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async (snap) => {
        const docs = snap.docs.map(async (doc) => {

          // PostsデータのauthorIdを元にUsersデータを取ってくる
          const _usersdoc = (await firebase.firestore().collection('users').doc(doc.data().authorId).get())

          console.log(_usersdoc)
          return {
            docId: doc.id,
            authorId: _usersdoc.id as string,
            userName: _usersdoc.data()?.name as string,
            userImages: _usersdoc.data()?.photoURL as string,
            postBody: doc.data().postBody as string,
            createdAt: dayjs(doc.data().createdAt.toDate()).format('YYYY/MM/DD hh:mm:ss'),
          }
        })
        const _datas = await Promise.all(docs)
        _setFetchPostDatas(_datas)
        return _datas
      })
  }, [collection])

  /**
   * DBから取得した全ユーザーのポストデータを返す
   */
  const fetchPostDatas = (): PostsData[] | undefined => {
    return _fetchPostDatas
  }

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const unsubscribe = fetchPostsOnSnapShot()

    return () => {
      mounted.current = false
      unsubscribe()
    }
  }, [collection, user, fetchPostsOnSnapShot])

  return {
    fetchPostDatas
  }
}
