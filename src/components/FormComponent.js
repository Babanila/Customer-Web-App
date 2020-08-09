import React from 'react'
import { cx, css } from 'emotion'
import { utcDateConverter } from './Utils'

const formStyle = css`
  width: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #000000;
  background-color: #ffffff;
`

const formInput = css`
  width: 90%;
  display: flex;
  align-self: center;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 1px solid #f54b3a;
  border-radius: 4px;
  outline: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 1.2em;
  margin-bottom: 1em;
`

const inputStyle = {
  fontSize: '16px',
  outline: 'none',
  border: 'none',
  marginLeft: '0.5em'
}

function FormComponent({ formData, handleSubmit, handleInputChange }) {
  return (
    <form className={cx(formStyle)} onSubmit={(e) => handleSubmit(e)}>
      <div className={cx(formInput)}>
        <label>
          CustomerId:
          <input
            style={inputStyle}
            name="customerId"
            type="text"
            placeholder="CustomerId"
            value={formData.customerID}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className={cx(formInput)}>
        <label>
          First Name:
          <input
            style={inputStyle}
            name="first"
            type="text"
            placeholder="First Name"
            value={formData.name.first}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className={cx(formInput)}>
        <label>
          Last Name:
          <input
            style={inputStyle}
            name="last"
            type="text"
            placeholder="Last Name"
            value={formData.name.last}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className={cx(formInput)}>
        <label>Gender:</label>
        <select
          name="gender"
          style={inputStyle}
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="m">Male</option>
          <option value="w">Female</option>
          <option value="o">Other</option>
        </select>
      </div>

      <div className={cx(formInput)}>
        <label>Birthday:</label>
        <div>
          <input
            style={inputStyle}
            name="birthday"
            type="date"
            placeholder="Birthday"
            value={formData.birthday}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cx(formInput)}>
        <label>Last Contact:</label>
        <div>
          <input
            style={inputStyle}
            name="lastContact"
            type={formData.lastContact.includes('Z') ? 'datetime' : 'datetime-local'}
            placeholder="Last Contact"
            value={
              formData.lastContact.includes('Z')
                ? utcDateConverter(formData.lastContact)
                : formData.lastContact
            }
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={cx(formInput)}>
        <label>Lifetime Value:</label>
        <div>
          <input
            style={inputStyle}
            name="customerLifetimeValue"
            type="text"
            value={formData.customerLifetimeValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  )
}

export default FormComponent
