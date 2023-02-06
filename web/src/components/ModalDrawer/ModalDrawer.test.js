import { render } from '@redwoodjs/testing/web'

import ModalDrawer from './ModalDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ModalDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ModalDrawer />)
    }).not.toThrow()
  })
})
