import React from "react";
import { cx, css } from "emotion";

const pageHeaderDiv = css`
  width: 100%;
  height: 5em;
  font-family: "Source Sans Pro", "Helvetica Neue", "sans-serif", Helvetica, Arial;
  color: #ffffff;
  background-color: #f54b3a;
  padding-left: 1em;
`;

function PageHeader() {
  return (
    <div className={cx(pageHeaderDiv)}>
      <h1>Mapp</h1>
    </div>
  );
}

export default PageHeader;
