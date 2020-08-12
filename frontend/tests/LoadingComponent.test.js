import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import LoadingComponent from '../src/components/LoadingComponent'

describe('Check LoadingComponent Component', () => {
  it('should renders without crashing', () => {
    const tree = renderer.create(<LoadingComponent />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correct number of element in LoadingComponent component', () => {
    const LoadingComponentWrapper = shallow(<LoadingComponent />)
    const actual = LoadingComponentWrapper.find('h3')

    expect(LoadingComponent).toBeDefined()
    expect(actual.exists).toBeTruthy()
    expect(actual.length).toEqual(1)
    expect(actual.text()).toEqual('Loading ...')
  })
})
