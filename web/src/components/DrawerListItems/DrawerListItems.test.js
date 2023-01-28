import { render } from '@redwoodjs/testing/web'

import DrawerListItems from './DrawerListItems'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DrawerListItems', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DrawerListItems />)
    }).not.toThrow()
  })
})
