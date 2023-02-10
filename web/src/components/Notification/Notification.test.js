import { render } from '@redwoodjs/testing/web'

import Notification from './Notification'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Notification', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Notification />)
    }).not.toThrow()
  })
})
