import { useState } from 'react'
import firebase from '../model/_shared/firebase'
import nanoid from 'nanoid'

//----------------------------------
// interface
//----------------------------------
export interface Form {
  setText: (text: string) => void
  setData: (text: string) => Promise<void>
  onSubmit: (event: React.FormEvent) => void
  onDelete: (docId: string | undefined) => Promise<void>
  text: () => string
  error: () => string
  disabled: () => boolean
  visibilityStatus: (text: string) => string
}

//----------------------------------
// hooks
//----------------------------------
export const useForm = (
  user: firebase.User | null,
  collection: string
): Form => {
  /**
   * テキスト入力のステート
   */
  const [_text, _setText] = useState<string>('')
  const [_error, _setErrorText] = useState<string>('')
  const [_disabled, _setDisabled] = useState<boolean>(false)
  const maxLen = 10

  /**
   * フィールドに入力されたテキストをセットする
   */
  const setText = (text: string): void => {
    if (text.length > maxLen) {
      _setErrorText(`${maxLen}文字以内で入力してください`)
      _setText(text)
      return
    }
    if (text.length <= maxLen) {
      _setErrorText('')
      _setText(text)
    }
  }

  /**
   * フィールドのテキストを保存する
   */
  const setData = async (text: string): Promise<void> => {
    // フォームが空だった場合は何もしない
    if (text === '') return

    // フォームが10文字以上だったらエラー文を返す
    if (text.length > maxLen) {
      _setErrorText(`${maxLen}文字以内で入力してください`)
      return
    }

    // フォームが10文字以下だったら保存する
    if (text.length <= maxLen) {
      _setDisabled(true)
      await firebase
        .firestore()
        .collection(collection)
        .doc(nanoid())
        .set(
          {
            authorId: user?.uid,
            postBody: text,
            isPublished: true,
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now()
          },
          { merge: true }
        )
      console.log('保存されました')
    }
    _setText('')
    _setDisabled(false)
  }

  /**
   * フィールドに入力されたテキストを返す
   */
  const text = (): string => {
    return _text
  }

  /**
   * フィールドに入力されたテキストが制限数を超えている場合エラーテキストを返す
   */
  const error = (): string => {
    return _error
  }

  /**
   * ボタンが押されたときのボタンのdisabledがどうかの状態を返す
   */
  const disabled = (): boolean => {
    return _disabled
  }

  /**
   * フィールドに入力されたテキスト文字数でクラスを付け替える
   */
  const visibilityStatus = (text: string): string => {
    return text ? 'visible' : 'hidden'
  }

  /**
   * フォームのSubmitボタンを押したときにフォームのイベントをストップする
   */
  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
  }

  /**
   * フォームのDeleteボタンを押したときDBから削除する
   */
  const onDelete = async (docId: string | undefined): Promise<void> => {
    const snapShot = firebase
      .firestore()
      .collection(collection)
      .doc(docId)
    await snapShot.delete()
  }

  return {
    setText,
    setData,
    text,
    error,
    disabled,
    visibilityStatus,
    onSubmit,
    onDelete
  }
}
