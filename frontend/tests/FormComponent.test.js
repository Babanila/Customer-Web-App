import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import FormComponent from '../src/components/FormComponent'

describe('Check FormComponent Component', () => {
  let sampleFormData, handleSubmit, handleInputChange

  beforeEach(() => {
    handleSubmit = jest.fn()
    handleInputChange = jest.fn()
    sampleFormData = {
      customerID: 7,
      name: {
        first: 'Sarah',
        last: 'Conol'
      },
      birthday: '1986-03-21',
      gender: 'w',
      lastContact: '2017-06-01T23:28:56.782Z',
      customerLifetimeValue: 2191
    }
  })

  it('should renders component without crashing', () => {
    const tree = renderer
      .create(
        <FormComponent
          formData={sampleFormData}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correct number of element in FormComponent component', () => {
    const FormComponentWrapper = shallow(
      <FormComponent
        formData={sampleFormData}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    )

    const actualDiv = FormComponentWrapper.find('div')
    const actualLabel = FormComponentWrapper.find('label')
    const actualInput = FormComponentWrapper.find('input')
    expect(FormComponent).toBeDefined()
    expect(actualDiv.exists).toBeTruthy()
    expect(actualDiv.length).toEqual(10)
    expect(actualLabel.length).toEqual(7)
    expect(actualInput.length).toEqual(6)
  })
})
