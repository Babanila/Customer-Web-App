import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import PageHeader from '../src/components/PageHeader'

describe('Check PageHeader Component', () => {
  it('should renders without crashing', () => {
    const tree = renderer.create(<PageHeader />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correct number of element in PageHeader component', () => {
    const PageHeaderWrapper = shallow(<PageHeader />)
    const actual = PageHeaderWrapper.find('div')

    expect(PageHeader).toBeDefined()
    expect(actual.exists).toBeTruthy()
    expect(actual.length).toEqual(1)
    expect(actual.find('h1').length).toEqual(1)
    expect(actual.find('h1').text()).toEqual('Mapp')
  })
})
