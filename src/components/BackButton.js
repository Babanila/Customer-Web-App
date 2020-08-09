import React from 'react'
import { css } from 'emotion'
import SingleButton from './SingleButton'

function BackButton({ handleBack }) {
  const backBtnStyle = css`
    padding: 10px;
    font-size: 1em;
    color: #000000;
    background-color: #ffffff;
    border: 2px solid #000000;
    border-radius: 5px;
    outline: none;
    &:hover {
      cursor: pointer;
      color: #ffffff;
      background-color: #000000;
    }
  `
  return <SingleButton btnName="Back" btnClick={handleBack} btnStyles={backBtnStyle} />
}

export default BackButton
