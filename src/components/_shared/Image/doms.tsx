import React from 'react'

//----------------------------------
// props
//----------------------------------
export interface ImageProps {
  className?: string
  src: string | undefined
  alt: string | undefined
  width: number
  height: number
}

//----------------------------------
// component
//----------------------------------
export const ImageComponent = (props: ImageProps) => (
  <img className={props.className} src={props.src} alt={props.alt} width={props.width} height={props.height} />
)