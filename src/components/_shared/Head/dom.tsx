import { useEffect } from 'react'

//----------------------------------
// component
//----------------------------------
export const HeadComponent = () => {
  useEffect(() => {
    document.title = 'React ✕ FireBase'
  }, [])

  return null
}
