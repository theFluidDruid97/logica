// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <RequestDrawer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import RequestDrawer from './RequestDrawer'

export const generated = () => {
  return <RequestDrawer />
}

export default {
  title: 'Components/RequestDrawer',
  component: RequestDrawer,
}
