import React from "react";
import { cx, css } from "emotion";

const errorDiv = css`
  display: flex;
  align-self: center;
`;

function ErrorComponent() {
  return <div className={cx(errorDiv)}>Page not found!</div>;
}

export default ErrorComponent;
