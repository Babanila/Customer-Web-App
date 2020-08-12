import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import SingleCustomer from '../src/components/SingleCustomer'

describe('Check SingleCustomer Component', () => {
  let handleBack
  let sampleCustomerData

  beforeEach(() => {
    handleBack = jest.fn()
    sampleCustomerData = {
      customerID: 1,
      name: {
        first: 'Peter',
        last: 'Smith'
      },
      birthday: '1996-10-12',
      gender: 'm',
      lastContact: '2017-06-01T23:28:56.782Z',
      customerLifetimeValue: 191.12
    }
  })

  it('should renders without crashing', () => {
    const tree = renderer
      .create(<SingleCustomer customerData={sampleCustomerData} handleBack={handleBack} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correct number of element in SingleCustomer component', () => {
    const SingleCustomerWrapper = shallow(
      <SingleCustomer customerData={sampleCustomerData} handleBack={handleBack} />
    )

    const actual = SingleCustomerWrapper.find('div')
    expect(SingleCustomer).toBeDefined()
    expect(actual.exists).toBeTruthy()
    expect(actual.length).toEqual(6)
    expect(actual.at(0).text()).toContain('1PeterSmithThu, 01 Jun 2017 23:28:56 GMT191.12')
    expect(actual.at(0).childAt(0).text()).toEqual('1')
    expect(actual.at(0).childAt(2).text()).toEqual('Smith')
  })
})
