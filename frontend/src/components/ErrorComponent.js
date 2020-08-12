import React from 'react'
import { cx, css } from 'emotion'

function ErrorComponent() {
  const errorStyle = css`
    width: 100%;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f54b3a;
    margin-top: 10em;
  `

  return (
    <div className={cx(errorStyle)}>
      <h3>Page not found!!!</h3>
    </div>
  )
}

export default ErrorComponent
