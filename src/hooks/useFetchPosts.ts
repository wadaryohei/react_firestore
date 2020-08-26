import firebase from '../model/_shared/firebase'
import { useState, useEffect, useCallback, useRef } from 'react'
import dayjs from 'dayjs'
import { PostType } from '../model/Post/type'
import { FireModel } from '../model/_shared/FireModel'

//----------------------------------
// type
//----------------------------------
export interface useFetchPostsType {
  fetchPostDatas: () => PostType[]
}

//----------------------------------
// hooks
//----------------------------------
export const useFetchPosts = (
  collection: string,
  user: firebase.User | null
): useFetchPostsType => {
  const [_fetchPostDatas, _setFetchPostDatas] = useState<PostType[]>([])
  const mount = useRef<boolean>(true)

  /**
   * 全ユーザーのPostsを取得する
   */
  const fetchPostsOnSnapShot = useCallback((): (() => void) => {
    return firebase
      .firestore()
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async snap => {
        const docs = snap.docs.map(async doc => {
          // PostsデータのauthorIdを元にUsersデータを取ってくる
          const usersModel = new FireModel(`users/${doc.data().authorId}`)
          const usersDocs = await usersModel.getDocumentDatas()

          return {
            docId: doc.id as string,
            authorId: usersDocs?.id as string,
            userName: usersDocs?.data()?.name as string,
            userImages: usersDocs?.data()?.photoURL as string,
            postBody: doc.data().postBody as string,
            createdAt: dayjs(doc.data().createdAt.toDate()).format(
              'YYYY/MM/DD hh:mm:ss'
            )
          }
        })
        const _datas = await Promise.all(docs)
        if (mount.current) {
          _setFetchPostDatas(_datas)
        }
        return _datas
      })
  }, [collection])

  /**
   * DBから取得した全ユーザーのポストデータを返す
   */
  const fetchPostDatas = (): PostType[] => {
    return _fetchPostDatas
  }

  //----------------------------------
  // lifeCycle
  //----------------------------------
  useEffect(() => {
    const unsubscribe = fetchPostsOnSnapShot()

    return () => {
      mount.current = false
      unsubscribe()
    }
  }, [collection, user, fetchPostsOnSnapShot])

  return {
    fetchPostDatas
  }
}
