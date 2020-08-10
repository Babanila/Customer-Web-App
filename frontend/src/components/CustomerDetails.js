import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { cx, css } from 'emotion'
import FormComponent from './FormComponent'
import ErrorComponent from './ErrorComponent'
import SingleButton from './SingleButton'
import BackButton from './BackButton'
import { baseUrl, isoDateConverter } from './Utils'

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
  width: 65%;
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

const deleteBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  outline: none;
  border: 2px solid #ff0000;
  border-radius: 5px;
  color: #ff0000;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #ff0000;
  }
`

function CustomerDetails({ match }) {
  const history = useHistory()
  const [selectedCustomer, setSelectedCustomer] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  const url = `${baseUrl}/customer/${parseInt(match.params.id)}`

  React.useEffect(() => {
    fetchCustomerRequest(url)
  }, [])

  const fetchCustomerRequest = async (inputUrl) => {
    try {
      const { data } = await axios(inputUrl)
      setSelectedCustomer(data)
      setLoading(false)
    } catch (err) {
      console.log('error', err)
      setError(err)
    }
  }

  const handleDataChange = ({ target }) => {
    const { name, value } = target
    let modifiedValue
    name === 'lastContact' ? (modifiedValue = isoDateConverter(value)) : (modifiedValue = value)
    setSelectedCustomer((state) => ({
      ...state,
      name: {
        ...state.name,
        first: name === 'first' ? modifiedValue : state.name.first,
        last: name === 'last' ? modifiedValue : state.name.last
      },
      [name]: modifiedValue
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios(`${baseUrl}/edit_customer/${parseInt(match.params.id)}`)
      console.log(data)
      console.log('Update button clicked')
      // history.push(`/`)
    } catch (error) {}
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios(`${baseUrl}/delete_customer/${parseInt(match.params.id)}`)
      console.log(data)
      console.log('delete button clicked')
      // history.push(`/`)
    } catch (error) {}

    // const newallCustomerData = allCustomerData.filter(
    //   (item) => item.customerID !== parseInt(match.params.id)
    // )
    // console.log('Delete button clicked', newallCustomerData)
    // alert(`Customer with ${match.params.id} deleted.`)
    // history.push(`/`)
  }

  const handleBack = () => history.push(`/`)

  const selectedCustomerDetails = (
    <div className={cx(customerDetailsDivStyle)}>
      <div className={cx(customerDetailsDivTitle)}>Customer Full Details</div>
      <FormComponent
        formData={selectedCustomer}
        handleSubmit={handleUpdate}
        handleInputChange={handleDataChange}
      />
      <div className={cx(customerDetailsBtnGroup)}>
        <SingleButton btnName="Update" btnClick={handleUpdate} btnStyles={updateBtnStyle} />
        <SingleButton btnName="Delete" btnClick={handleDelete} btnStyles={deleteBtnStyle} />
        <BackButton handleBack={handleBack} />
      </div>
    </div>
  )

  return error ? <ErrorComponent /> : loading ? <div>Looding ...</div> : selectedCustomerDetails

  // return selectedCustomer ? selectedCustomerDetails : <ErrorComponent />
}

export default CustomerDetails
