import React from 'react'
import { Typography } from '../Typography/index'
import { useFormType } from '../../../hooks/useForm'

//----------------------------------
// props
//----------------------------------
export interface PostFormProps {
  form: useFormType
  className?: string
}

//----------------------------------
// component
//----------------------------------
export const PostFormComponent = (props: PostFormProps) => (
  <form className={props.className} onSubmit={(e) => props.form.onSubmit(e)}>
    <div className={'formInner'}>
      <input value={props.form.text()} type="text" onChange={(e) => props.form.onChangeText(e.target.value)} onKeyPress={(e) => props.form.onKeyPress(e, props.form.text())} />
      <input type="submit" value="Send" disabled={props.form.disabled()} onClick={() => props.form.onClick(props.form.text())} />
    </div>
    <Typography component={'p'} className={props.form.visibilityStatus(props.form.error())}>
      {props.form.error()}
    </Typography>
  </form>
)
