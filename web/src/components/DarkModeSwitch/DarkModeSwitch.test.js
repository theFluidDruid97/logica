import { render } from '@redwoodjs/testing/web'

import DarkModeSwitch from './DarkModeSwitch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DarkModeSwitch', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DarkModeSwitch />)
    }).not.toThrow()
  })
})
