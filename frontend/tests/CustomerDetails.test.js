import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import CustomerDetails from '../src/components/CustomerDetails'

describe('Check CustomerDetails Component', () => {
  let sampleData, CustomerDetailsWrapper, match
  let actualDiv, actualDiv1, actualDiv2

  beforeEach(() => {
    sampleData = {
      customerID: 4,
      name: {
        first: 'Roxy',
        last: 'Fox'
      },
      birthday: '1979-06-30',
      gender: 'w',
      lastContact: '2017-01-29T21:08:50.700Z',
      customerLifetimeValue: 213.12
    }

    match = { params: { id: 4 } }

    CustomerDetailsWrapper = mount(
      <MemoryRouter initialentries="{['/']}">
        <CustomerDetails match={match} />
      </MemoryRouter>
    )

    actualDiv = CustomerDetailsWrapper.find('MemoryRouter')
    actualDiv1 = actualDiv.find('Router')
    actualDiv2 = actualDiv1.find('CustomerDetails')
  })

  it('should renders component without crashing', () => {
    const tree = renderer.create(<CustomerDetails match={match} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render CustomerDetails component without data', () => {
    const actualDiv3 = actualDiv2.find('LoadingComponent')

    expect(CustomerDetails).toBeDefined()
    expect(actualDiv.length).toEqual(1)
    expect(actualDiv1.length).toEqual(1)
    expect(actualDiv2.length).toEqual(1)
    expect(actualDiv3.length).toEqual(1)
  })

  it('should render CustomerDetails component data', () => {
    const setSelectedCustomer = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setSelectedCustomer(sampleData))

    const setLoading = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setLoading(false))

    const CustomerDetailsWrap = mount(
      <MemoryRouter initialentries="{['/']}">
        <CustomerDetails match={match} />
      </MemoryRouter>
    )

    const actual1 = CustomerDetailsWrap.find('div')
    const actual2 = CustomerDetailsWrap.find('FormComponent')
    const actual3 = CustomerDetailsWrap.find('SingleButton')
    const actual4 = CustomerDetailsWrap.find('BackButton')
    const actual5 = actual2.children()

    expect(actual1.length).toEqual(13)
    expect(actual2.length).toEqual(1)
    expect(actual3.length).toEqual(3)
    expect(actual4.length).toEqual(1)
    expect(actual5.at(0).childAt(0).text()).toEqual('CustomerId:')
  })
})
