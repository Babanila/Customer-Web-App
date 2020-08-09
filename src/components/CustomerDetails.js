import React from 'react'
import { useHistory } from 'react-router-dom'
import { cx, css } from 'emotion'
import FormComponent from './FormComponent'
import ErrorComponent from './ErrorComponent'
import SingleButton from './SingleButton'
import BackButton from './BackButton'
import { isoDateConverter } from './Utils'

const customerDetailsDivStyle = css`
  margin-top: 3em;
  width: 400px;
  height: auto;
  display: flex;
  align-self: center;
  flex-direction: column;
  border: 1px solid #f54b3a;
  border-radius: 5px;
`

const customerDetailsDivTitle = css`
  align-self: center;
  font-size: 2em;
  padding: 20px 0px;
`

const customerDetailsBtnGroup = css`
  margin-bottom: 20px;
  width: 42%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  outline: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 1.2em;
`

const updateBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  color: #009900;
  border: 2px solid #009900;
  background-color: #ffffff;
  border-radius: 5px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #009900;
  }
`

function CustomerDetails({ allCustomerData, match }) {
  const history = useHistory()
  const selectedCustomer = allCustomerData.find(
    (item) => item.customerID === parseInt(match.params.id)
  )

  const [changeCustomerData, setChangeCustomerData] = React.useState(selectedCustomer)
  const handleDataChange = ({ target }) => {
    const { name, value } = target
    let modifiedValue
    name === 'lastContact' ? (modifiedValue = isoDateConverter(value)) : (modifiedValue = value)
    setChangeCustomerData((state) => ({
      ...state,
      name: {
        ...state.name,
        first: name === 'first' ? modifiedValue : state.name.first,
        last: name === 'last' ? modifiedValue : state.name.last
      },
      [name]: modifiedValue
    }))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    console.log('Update button clicked')
  }

  const handleBack = () => history.push(`/`)

  const selectedCustomerDetails = (
    <div className={cx(customerDetailsDivStyle)}>
      <div className={cx(customerDetailsDivTitle)}>Customer Full Details</div>
      <FormComponent
        formData={changeCustomerData}
        handleSubmit={handleUpdate}
        handleInputChange={handleDataChange}
      />
      <div className={cx(customerDetailsBtnGroup)}>
        <SingleButton btnName="Update" btnClick={handleUpdate} btnStyles={updateBtnStyle} />
        <BackButton handleBack={handleBack} />
      </div>
    </div>
  )

  return selectedCustomer ? selectedCustomerDetails : <ErrorComponent />
}

export default CustomerDetails
