import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import FireModel from '../model/_shared/fireModel'
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
export const useFetchPosts = (): useFetchPostsType => {
  const [_fetchPostDatas, _setFetchPostDatas] = useState<PostType[]>([])
  const mount = useRef<boolean>(true)
  const fireModel = new FireModel()

  /**
   * 全ユーザーのPostsを取得する
   */
  const fetchPostsOnSnapShot = (): (() => void) => {
    const postsRef = fireModel.baseReference('posts')
    return postsRef.orderBy('createdAt', 'desc').onSnapshot(async snap => {
      const docs = snap.docs.map(async doc => {
        // PostsデータのauthorIdを元にUsersデータを取ってくる
        const profilesRef = await fireModel
          .baseReference('profiles')
          .doc(doc.data().authorId)
          .get()
        return {
          docId: doc.id,
          authorId: profilesRef.id as string,
          userName: profilesRef.data()?.name as string,
          userImages: profilesRef.data()?.photoURL as string,
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
  }

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
    // eslint-disable-next-line
  }, [])

  return {
    fetchPostDatas
  }
}
