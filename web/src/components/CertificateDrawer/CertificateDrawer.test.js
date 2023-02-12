import { render } from '@redwoodjs/testing/web'

import CertificateDrawer from './CertificateDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CertificateDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CertificateDrawer />)
    }).not.toThrow()
  })
})
