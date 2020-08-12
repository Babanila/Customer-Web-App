import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ErrorComponent from '../src/components/ErrorComponent'

describe('Check ErrorComponent Component', () => {
  it('should renders without crashing', () => {
    const tree = renderer.create(<ErrorComponent />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correct number of element in ErrorComponent component', () => {
    const ErrorComponentWrapper = shallow(<ErrorComponent />)
    const actual = ErrorComponentWrapper.find('div')

    expect(ErrorComponent).toBeDefined()
    expect(actual.exists).toBeTruthy()
    expect(actual.length).toEqual(1)
    expect(actual.text()).toEqual('Page not found!!!')
  })

  it('should render the message passed', () => {
    const ErrorComponentWrapper = shallow(<ErrorComponent message="Error occur" />)
    const actual = ErrorComponentWrapper.find('div')

    expect(ErrorComponent).toBeDefined()
    expect(actual.exists).toBeTruthy()
    expect(actual.length).toEqual(1)
    expect(actual.text()).toEqual('Error occur')
  })
})
