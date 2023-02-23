import { render } from '@redwoodjs/testing/web'

import RequestTrainingDrawer from './RequestTrainingDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RequestTrainingDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RequestTrainingDrawer />)
    }).not.toThrow()
  })
})
