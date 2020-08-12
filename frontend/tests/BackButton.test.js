import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import BackButton from '../src/components/BackButton'

describe('Check BackButton Component', () => {
  const handleBack = jest.fn()

  it('should renders without crashing', () => {
    const tree = renderer.create(<BackButton handleBack={handleBack} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correct number of element in BackButton component', () => {
    const BackButtonWrapper = mount(<BackButton handleBack={handleBack} />)
    const actual = BackButtonWrapper.find('SingleButton')

    expect(BackButton).toBeDefined()
    expect(actual.exists).toBeTruthy()
    expect(actual.length).toEqual(1)
    expect(actual.find('button').length).toEqual(1)
    expect(actual.find('button').text()).toEqual('Back')
  })

  it('should renders correct text in BackButton component', () => {
    const { getByText } = render(<BackButton handleBack={handleBack} />)
    expect(getByText(/back/i)).toHaveTextContent('Back')
  })
})
