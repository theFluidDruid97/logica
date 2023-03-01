import { render } from '@redwoodjs/testing/web'

import RequestDrawer from './RequestDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RequestDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RequestDrawer />)
    }).not.toThrow()
  })
})
