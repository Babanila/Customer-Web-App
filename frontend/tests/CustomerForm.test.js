import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import CustomerForm from '../src/components/CustomerForm'

describe('Check CustomerForm Component', () => {
  let sampleData, CustomerFormWrapper, match
  let actualDiv, actualDiv1, actualDiv2

  beforeEach(() => {
    sampleData = {
      customerID: 9,
      name: {
        first: 'John',
        last: 'Bull'
      },
      birthday: '1999-08-15',
      gender: 'w',
      lastContact: '2010-05-09T11:08:50.700Z',
      customerLifetimeValue: 2513
    }

    CustomerFormWrapper = mount(
      <MemoryRouter initialentries="{['/']}">
        <CustomerForm />
      </MemoryRouter>
    )

    actualDiv = CustomerFormWrapper.find('MemoryRouter')
    actualDiv1 = actualDiv.find('Router')
    actualDiv2 = actualDiv1.find('CustomerForm')
  })

  it('should renders component without crashing', () => {
    const tree = renderer.create(<CustomerForm />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render CustomerForm component without data', () => {
    const actualDiv3 = actualDiv2.find('div')

    expect(CustomerForm).toBeDefined()
    expect(actualDiv.length).toEqual(1)
    expect(actualDiv1.length).toEqual(1)
    expect(actualDiv2.length).toEqual(1)
    expect(actualDiv3.length).toEqual(13)
  })

  it('should render CustomerForm component data', () => {
    const setSelectedCustomer = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setSelectedCustomer(sampleData))

    const setLoading = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setLoading(false))

    const CustomerFormWrap = mount(
      <MemoryRouter initialentries="{['/']}">
        <CustomerForm />
      </MemoryRouter>
    )

    const actual1 = CustomerFormWrap.find('div')
    const actual2 = CustomerFormWrap.find('FormComponent')
    const actual3 = CustomerFormWrap.find('SingleButton')
    const actual4 = CustomerFormWrap.find('BackButton')
    const actual5 = actual2.children()

    expect(actual1.length).toEqual(13)
    expect(actual2.length).toEqual(1)
    expect(actual3.length).toEqual(3)
    expect(actual4.length).toEqual(1)
    expect(actual5.at(0).childAt(0).text()).toEqual('CustomerId:')
  })
})
