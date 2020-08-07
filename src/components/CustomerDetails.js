import React from 'react';
import moment from 'moment';
import { cx, css } from 'emotion';

const tableRowDiv = css`
  display: table-row;
  background-color: #f6f6f6;
  &:hover {
    background-color: #ffe7e7;
  }
`;

const tableCellDiv = css`
  display: table-cell;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid black;
`;

function CustomerDetails({ customerData, onClick }) {
  const { customerID, name, lastContact, customerLifetimeValue } = customerData;
  return (
    <div className={cx(tableRowDiv)} onClick={() => onClick(customerID)}>
      <div className={cx(tableCellDiv)}>{customerID}</div>
      <div className={cx(tableCellDiv)}>{name.first}</div>
      <div className={cx(tableCellDiv)}>{name.last}</div>
      <div className={cx(tableCellDiv)}>{moment(lastContact).format('lll')}</div>
      <div className={cx(tableCellDiv)}>{customerLifetimeValue}</div>
    </div>
  );
}

export default CustomerDetails;
