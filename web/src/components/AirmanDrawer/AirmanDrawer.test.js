import { render } from '@redwoodjs/testing/web'

import AirmanDrawer from './AirmanDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AirmanDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AirmanDrawer />)
    }).not.toThrow()
  })
})
