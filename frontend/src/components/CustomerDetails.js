import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { cx, css } from 'emotion'
import FormComponent from './FormComponent'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'
import SingleButton from './SingleButton'
import BackButton from './BackButton'
import { fetcher, baseUrl } from './Utils'

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

  const id = parseInt(match.params.id)
  const url = `${baseUrl}/customer/${id}`
  const updateUrl = `${baseUrl}/edit_customer/${id}`
  const deleteUrl = `${baseUrl}/delete_customer/${id}`

  React.useEffect(() => {
    fetcher(url, setSelectedCustomer, setError, setLoading)
  }, [id, url, updateUrl, deleteUrl])

  const handleDataChange = ({ target }) => {
    const { name, value } = target
    setSelectedCustomer((state) => ({
      ...state,
      name: {
        ...state.name,
        first: name === 'first' ? value : state.name.first,
        last: name === 'last' ? value : state.name.last
      },
      [name]: value
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(updateUrl, selectedCustomer)
      alert(data)
      history.push(`/customer/${id}`)
    } catch (error) {
      error.message.includes('Request failed with status code 500')
        ? alert('CustomerID can not be changed')
        : alert(error.message)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(deleteUrl)
      alert(data)
      history.push('/')
    } catch (error) {
      setError(error)
    }
  }

  const handleBack = () => history.push(`/`)

  if (error) return <ErrorComponent />
  if (loading) return <LoadingComponent />

  return (
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
}

export default CustomerDetails
