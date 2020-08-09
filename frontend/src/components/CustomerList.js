import React from 'react'
import { useHistory } from 'react-router-dom'
import { cx, css } from 'emotion'
import SingleCustomer from './SingleCustomer'
import SingleButton from './SingleButton'

const tableDiv = css`
  margin-top: 2em;
  width: 100%;
  max-width: 800px;
  display: table;
`

const tableTitleDiv = css`
  display: table-caption;
  font-size: 26px;
  font-weight: bold;
  padding-left: 10px;
  padding-bottom: 10px;
`

const tableHeaderDiv = css`
  display: table-cell;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
`

const tableBodyDiv = css`
  display: table-row-group;
`

const btnDiv = css`
  margin-top: 1em;
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: flex-end;
`

const addCustomerBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  color: #ffffff;
  border: 2px solid #009900;
  background-color: #009900;
  border-radius: 5px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #000000;
    background-color: #ffffff;
    border: 2px solid #f54b3a;
  }
`

function CustomerList({ allCustomerData, match }) {
  const history = useHistory()
  const showCustomerDetails = (id) => history.push(`/customer/${id}`)
  const handleNewCustomer = () => history.push(`/new-customer`)

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
            <SingleCustomer key={i} customerData={item} onClick={showCustomerDetails} />
          ))}
        </div>
      </div>
      <div className={cx(btnDiv)}>
        <SingleButton
          btnName="Add Customer"
          btnClick={handleNewCustomer}
          btnStyles={addCustomerBtnStyle}
        />
      </div>
    </div>
  )
}

export default CustomerList
