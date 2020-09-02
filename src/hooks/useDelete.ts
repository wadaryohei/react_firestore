import firebase from '../model/_shared/firebase'
import { functions } from '../model/_shared/functions'
import { useRef, useEffect } from 'react'
import { useLoad, useLoadType } from './useLoad'

//----------------------------------
// type
//----------------------------------
export interface useDeleteType {
  onDeleteUser: () => Promise<void>
  loading: useLoadType
}

//----------------------------------
// hooks
//----------------------------------
export const useDelete = (): useDeleteType => {
  const loading = useLoad(false)
  const mount = useRef<boolean>(true)

  useEffect(() => {
    return () => {
      mount.current = false
    }
  })

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
    loading.onLoadStart()
    await callUserDelete()
    await firebase.auth().signOut()
    if (mount.current) {
      loading.onLoadEnd()
    }
  }

  /**
   * ユーザー削除処理
   * @function userDelete functionsからユーザーを削除する
   * @function userDatasDelete 同時にfunctionsで関連ドキュメントを全削除する
   */
  const callUserDelete = async (): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const userDeleteFunc = functions.httpsCallable('userDelete')
    await userDeleteFunc().catch(e => {
      console.log(`${e}: ユーザーの削除に失敗しました。再度削除してください。`)
    })
  }

  return {
    onDeleteUser,
    loading
  }
}
