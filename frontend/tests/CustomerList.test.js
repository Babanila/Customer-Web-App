import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import CustomerList from '../src/components/CustomerList'

describe('Check CustomerList Component', () => {
  let sampleData, CustomerListWrapper
  let actualDiv, actualDiv1, actualDiv2

  beforeEach(() => {
    sampleData = [
      {
        customerID: 4,
        name: {
          first: 'Roxy',
          last: 'Fox'
        },
        birthday: '1979-06-30',
        gender: 'w',
        lastContact: '2017-01-29T21:08:50.700Z',
        customerLifetimeValue: 213.12
      },
      {
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
    ]

    CustomerListWrapper = mount(
      <MemoryRouter initialentries="{['/']}">
        <CustomerList />
      </MemoryRouter>
    )

    actualDiv = CustomerListWrapper.find('MemoryRouter')
    actualDiv1 = actualDiv.find('Router')
    actualDiv2 = actualDiv1.find('CustomerList')
  })

  it('should renders component without crashing', () => {
    const tree = renderer.create(<CustomerList />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render CustomerList component without data', () => {
    const actualDiv3 = actualDiv2.find('LoadingComponent')

    expect(CustomerList).toBeDefined()
    expect(actualDiv.length).toEqual(1)
    expect(actualDiv1.length).toEqual(1)
    expect(actualDiv2.length).toEqual(1)
    expect(actualDiv3.length).toEqual(1)
  })

  it('should render CustomerList component data', () => {
    const setSelectedCustomer = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setSelectedCustomer([...sampleData]))

    const setLoading = React.useState
    jest.spyOn(React, 'useState').mockImplementationOnce(() => setLoading(false))

    const CustomerListWrap = mount(
      <MemoryRouter initialentries="{['/']}">
        <CustomerList />
      </MemoryRouter>
    )

    const actual1 = CustomerListWrap.find('div')
    const actual2 = CustomerListWrap.find('SingleCustomer')
    const actual3 = actual2.children()
    const childDetails = actual3.at(0).simulate('click')

    expect(actual1.length).toEqual(23)
    expect(actual2.length).toEqual(2)
    expect(actual3.length).toEqual(2)
    expect(actual3.at(0).text()).toContain('4RoxyFoxSun, 29 Jan 2017 21:08:50 GMT213.12')
    expect(actual3.at(1).text()).toContain('7SarahConolThu, 01 Jun 2017 23:28:56 GMT2191')
    expect(actual3.at(0).childAt(0).text()).toEqual('4')
    expect(actual3.at(0).childAt(2).text()).toEqual('Fox')
    expect(childDetails.length).toEqual(1)
  })
})
