import React from 'react'
import { useHistory } from 'react-router-dom'
import { cx, css } from 'emotion'
import SingleCustomer from './SingleCustomer'
import SingleButton from './SingleButton'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'
import { fetcher, baseUrl } from './Utils'

const customerListDiv = css`
  margin-top: 6em;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
`

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

const titleWithBtnDiv = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const tableHeaderDiv = css`
  display: table-cell;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
  @media (max-width: 420px) {
    font-size: 16px;
  }
`

const tableBodyDiv = css`
  display: table-row-group;
`

const tableNullBody = css`
  display: table-caption;
  font-size: 20px;
  color: #f54b3a;
`

const addCustomerBtnStyle = css`
  padding: 5px;
  font-size: 0.7em;
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

function CustomerList() {
  const [allCustomerData, setAllCustomerData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    fetcher(baseUrl, setAllCustomerData, setError, setLoading)
  }, [baseUrl])

  const history = useHistory()
  const showCustomerDetails = (id) => history.push(`/customer/${id}`)
  const handleNewCustomer = () => history.push(`/new_customer`)

  if (error === 'Network Error') return <ErrorComponent message="Please contact your provider." />
  if (loading) return <LoadingComponent />

  return (
    <div className={cx(customerListDiv)}>
      <div className={cx(tableDiv)}>
        <div className={cx(tableTitleDiv)}>
          <div className={cx(titleWithBtnDiv)}>
            <div>Customer List</div>
            <SingleButton
              btnName="Add Customer"
              btnClick={handleNewCustomer}
              btnStyles={addCustomerBtnStyle}
            />
          </div>
        </div>
        <div className={cx(tableHeaderDiv)}>ID</div>
        <div className={cx(tableHeaderDiv)}>Firstname</div>
        <div className={cx(tableHeaderDiv)}>Lastname</div>
        <div className={cx(tableHeaderDiv)}>Last Contact</div>
        <div className={cx(tableHeaderDiv)}>Lifetime Value</div>
        {allCustomerData.length === 0 ? (
          <div className={cx(tableNullBody)}> No Customer Data in the Database</div>
        ) : (
          <div className={cx(tableBodyDiv)}>
            {allCustomerData.map((item, i) => (
              <SingleCustomer key={i} customerData={item} onClick={showCustomerDetails} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerList
