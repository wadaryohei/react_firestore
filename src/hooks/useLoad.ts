import { useState } from 'react'

//----------------------------------
// type
//----------------------------------
export interface useLoadType {
  isLoad: () => boolean
  onLoadStart: () => void
  onLoadEnd: () => void
  onSetLoad: (isLoad: boolean) => void
}

//----------------------------------
// hooks
//----------------------------------
export const useLoad = (isInitLoad: boolean): useLoadType => {
  const [_isLoad, setLoad] = useState<boolean>(isInitLoad)

  /**
   * ローディングの状態を返す
   */
  const isLoad = (): boolean => {
    return _isLoad
  }

  /**
   * ローディングをスタートする
   */
  const onLoadStart = (): void => {
    setLoad(true)
  }

  /**
   * ローディングを完了する
   */
  const onLoadEnd = (): void => {
    setLoad(false)
  }

  /**
   * ローディング状態をセットする
   */
  const onSetLoad = (isLoad: boolean): void => {
    setLoad(isLoad)
  }
  return {
    isLoad,
    onLoadStart,
    onLoadEnd,
    onSetLoad,
  }
}
