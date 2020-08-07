import React from 'react';
import CustomerDetails from './CustomerDetails';
import { cx, css } from 'emotion';

const tableDiv = css`
  width: 100%;
  display: table;
`;

const tableTitleDiv = css`
  display: table-caption;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const tableHeaderDiv = css`
  display: table-cell;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: justify;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
`;

const tableBodyDiv = css`
  display: table-row-group;
`;

function CustomerList({ allCustomerData }) {
  return (
    <div>
      <div className={cx(tableDiv)}>
        <div className={cx(tableTitleDiv)}> Customer List </div>
        <div className={cx(tableHeaderDiv)}>ID</div>
        <div className={cx(tableHeaderDiv)}>Firstname</div>
        <div className={cx(tableHeaderDiv)}>Lastname</div>
        <div className={cx(tableHeaderDiv)}>Last Contact</div>
        <div className={cx(tableHeaderDiv)}>Lifetime Value</div>
        <div className={cx(tableBodyDiv)}>
          {allCustomerData.map((item, i) => (
            <CustomerDetails key={i} customerData={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
