import { render } from '@redwoodjs/testing/web'

import TrainingDrawer from './TrainingDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TrainingDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TrainingDrawer />)
    }).not.toThrow()
  })
})
