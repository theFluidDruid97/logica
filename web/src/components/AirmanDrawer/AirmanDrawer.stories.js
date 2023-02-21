// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AirmanDrawer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AirmanDrawer from './AirmanDrawer'

export const generated = () => {
  return <AirmanDrawer />
}

export default {
  title: 'Components/AirmanDrawer',
  component: AirmanDrawer,
}
