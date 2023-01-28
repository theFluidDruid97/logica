import { render } from '@redwoodjs/testing/web'

import DrawerListItemsAdmin from './DrawerListItemsAdmin'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DrawerListItemsAdmin', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DrawerListItemsAdmin />)
    }).not.toThrow()
  })
})
