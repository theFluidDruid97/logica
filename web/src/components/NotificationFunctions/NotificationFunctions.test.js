import { render } from '@redwoodjs/testing/web'

import NotificationFunction from './NotificationFunctions'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NotificationFunction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotificationFunction />)
    }).not.toThrow()
  })
})
