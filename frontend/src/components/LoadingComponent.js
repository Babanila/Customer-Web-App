import React from 'react'
import { cx, css } from 'emotion'

function LoadingComponent() {
  const loadingStyle = css`
    width: 50%;
    margin-top: 30%;
    display: flex;
    justify-content: center;
    align-self: center;
  `
  return <h3 className={cx(loadingStyle)}>Loading ...</h3>
}

export default LoadingComponent
