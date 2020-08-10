import React from 'react'
import { cx, css } from 'emotion'

function ErrorComponent() {
  const errorStyle = css`
    width: 50%;
    margin-top: 30%;
    display: flex;
    justify-content: center;
    align-self: center;
    color: #ff0000;
  `

  return <div className={cx(errorStyle)}>Page not found!!!</div>
}

export default ErrorComponent
