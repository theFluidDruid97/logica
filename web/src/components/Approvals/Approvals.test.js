import { render } from '@redwoodjs/testing/web'

import Approvals from './Approvals'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Approvals', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Approvals />)
    }).not.toThrow()
  })
})
