// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <CertificateDrawer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import CertificateDrawer from './CertificateDrawer'

export const generated = () => {
  return <CertificateDrawer />
}

export default {
  title: 'Components/CertificateDrawer',
  component: CertificateDrawer,
}
