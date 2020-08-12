import React from 'react'
import { cx, css } from 'emotion'

function LoadingComponent() {
  const loadingStyle = css`
    width: 100%;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f54b3a;
    margin-top: 10em;
  `
  return <h3 className={cx(loadingStyle)}>Loading ...</h3>
}

export default LoadingComponent
