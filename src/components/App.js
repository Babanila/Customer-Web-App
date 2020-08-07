import React from 'react';
import { cx, css } from 'emotion';
import CustomerList from './CustomerList';
import dummyData from '../../customer-sample.json';

const rootDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <div className={cx(rootDiv)}>
      <CustomerList allCustomerData={dummyData} />
    </div>
  );
}

export default App;
