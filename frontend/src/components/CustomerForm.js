import React from 'react'
import { cx, css } from 'emotion'
import { useHistory } from 'react-router-dom'
import FormComponent from './FormComponent'
import SingleButton from './SingleButton'
import BackButton from './BackButton'
import { isoDateConverter } from './Utils'

const customerFormDivStyle = css`
  margin-top: 3em;
  width: 400px;
  height: auto;
  display: flex;
  align-self: center;
  flex-direction: column;
  border: 1px solid #f54b3a;
  border-radius: 5px;
`

const customerFormDivTitle = css`
  align-self: center;
  font-size: 2em;
  padding: 20px 0px;
`

const customerFormBtnGroup = css`
  margin-bottom: 20px;
  width: 65%;
  min-width: 260px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  box-sizing: border-box;
  outline: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 1.2em;
`

const addBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  border: 2px solid #009900;
  border-radius: 5px;
  outline: none;
  color: #009900;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #009900;
  }
`

const resetBtnStyle = css`
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

const initialState = {
  customerID: '',
  name: {
    first: '',
    last: ''
  },
  birthday: '',
  gender: '',
  lastContact: '',
  customerLifetimeValue: 0
}

function CustomerForm() {
  const history = useHistory()
  const [formState, setFormState] = React.useState(initialState)

  const handleInputChange = ({ target }) => {
    const { name, value } = target
    let inputValue
    name === 'lastContact' ? (inputValue = isoDateConverter(value)) : (inputValue = value)
    setFormState((state) => ({
      ...state,
      name: {
        ...state.name,
        first: name === 'first' ? inputValue : state.name.first,
        last: name === 'last' ? inputValue : state.name.last
      },
      [name]: inputValue
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit button clicked')
  }

  const handleReset = (e) => {
    e.preventDefault()
    setFormState(initialState)
  }

  const handleBack = () => history.push(`/`)

  return (
    <div className={cx(customerFormDivStyle)}>
      <div className={cx(customerFormDivTitle)}>Customer Registration Form</div>
      <FormComponent
        formData={formState}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
      <div className={cx(customerFormBtnGroup)}>
        <SingleButton btnName="Register" btnClick={handleSubmit} btnStyles={addBtnStyle} />
        <SingleButton btnName="Reset" btnClick={handleReset} btnStyles={resetBtnStyle} />
        <BackButton handleBack={handleBack} />
      </div>
    </div>
  )
}

export default CustomerForm
