import { useState, useEffect, useCallback, useRef } from 'react'
import dayjs from 'dayjs'
import firebase from '../model/_shared/firebase'
import fireModel from '../model/_shared/fireModel'
import { PostType } from '../model/Post/type'

//----------------------------------
// type
//----------------------------------
export interface useFetchPostsType {
  fetchPostDatas: () => PostType[] | undefined
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
    const postRef = fireModel.collectionRef(`${collection}`)
    return postRef.orderBy('createdAt', 'desc').onSnapshot(async snap => {
      const docs = snap.docs.map(async doc => {
        // PostsデータのauthorIdを元にUsersデータを取ってくる
        const _usersDoc = await fireModel.doc(`users/${doc.data().authorId}`)
        return {
          docId: doc.id,
          authorId: _usersDoc.id as string,
          userName: _usersDoc.data()?.name as string,
          userImages: _usersDoc.data()?.photoURL as string,
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
  const fetchPostDatas = (): PostType[] | undefined => {
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
