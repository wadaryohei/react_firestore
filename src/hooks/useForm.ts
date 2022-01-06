import { useState } from 'react'
import firebase from '../model/_shared/firebase'
import { nanoid } from 'nanoid'
import fireModel from '../model/_shared/fireModel'

//----------------------------------
// type
//----------------------------------
export interface useFormType {
  onChangeText: (text: string) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, text: string) => void
  onClick: (text: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onDelete: (docId: string | undefined) => Promise<void>
  visibilityStatus: (text: string) => string
  text: () => string
  error: () => string
  disabled: () => boolean
  setTextData: (text: string) => Promise<void>
}

//----------------------------------
// hooks
//----------------------------------
export const useForm = (user: firebase.User | null): useFormType => {
  /**
   * テキスト入力のステート
   */
  const [_text, _setText] = useState<string>('')
  const [_error, _setErrorText] = useState<string>('')
  const [_disabled, _setDisabled] = useState<boolean>(false)
  const maxLen = 10
  const path = new fireModel()

  /**
   * フィールドに入力されたテキストをチェックする
   */
  const onChangeText = (text: string): void => {
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
   * 押したキーがエンターだった場合フィールドのテキストを保存する
   */
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, text: string): void => {
    // キーがエンターだった場合
    if (e.which === 13) {
      e.preventDefault()
      setTextData(text)
    }
    return
  }

  /**
   * クリックボタンを押したときフィールドのテキストを保存する
   */
  const onClick = (text: string): void => {
    setTextData(text).catch((e) => {
      alert(`${e} 投稿に失敗しました。`)
    })
  }

  /**
   * フィールドのテキストを保存する
   */
  const setTextData = async (text: string): Promise<void> => {
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
      const postsPath = path.baseReference('posts').doc(nanoid())
      await postsPath.set(
        {
          authorId: user?.uid,
          postBody: text,
          isPublished: true,
          createdAt: firebase.firestore.Timestamp.now(),
          updatedAt: firebase.firestore.Timestamp.now(),
        },
        { merge: true }
      )
    }
    _setText('')
    _setDisabled(false)

    window.scroll(0, 0)
  }

  /**
   * フォームのSubmitボタンを押したときにフォームのイベントをストップする
   */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
  }

  /**
   * フォームのDeleteボタンを押したときDBから削除する
   */
  const onDelete = async (docId: string | undefined): Promise<void> => {
    const postsPath = path.baseReference('posts').doc(docId)
    await postsPath.delete()
  }

  /**
   * フィールドに入力されたテキスト文字数でクラスを付け替える
   */
  const visibilityStatus = (text: string): string => {
    return text ? 'visible' : 'hidden'
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

  return {
    onChangeText,
    onKeyPress,
    onClick,
    onSubmit,
    onDelete,
    visibilityStatus,
    text,
    error,
    disabled,
    setTextData,
  }
}
