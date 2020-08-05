import firebase from '../model/_shared/firebase'
import { useState, useRef, useEffect } from 'react'

//----------------------------------
// type
//----------------------------------
export interface useDeleteType {
  onDeleteUser: () => Promise<void>
  deleteLoading: () => boolean
}

//----------------------------------
// hooks
//----------------------------------
export const useDelete = (): useDeleteType => {
  const [_deleteLoading, _setDeleteLoading] = useState<boolean>(false)
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
    _setDeleteLoading(true)
    await callUserDelete()
    await firebase.auth().signOut()

    if(mount.current) {
      _setDeleteLoading(false)
    }
  }

  /**
   * ローディング状態を返す
   */
  const deleteLoading = (): boolean => {
    return _deleteLoading
  }

  /**
   * ユーザー削除処理
   * @function userDelete functionsからユーザーを削除する
   * @function userDatasDelete 同時にfunctionsで関連ドキュメントを全削除する
   */
  const callUserDelete = async (): Promise<void> => {
    // cloud functionsのfunctionをアプリ側からcall
    const userDeleteFunc = firebase.functions().httpsCallable('userDelete')
    await userDeleteFunc().catch(e => {
      console.log(`${e}: ユーザーの削除に失敗しました。再度削除してください。`)
    })
  }

  return {
    onDeleteUser,
    deleteLoading
  }
}
