// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Notification {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Notification from './Notification'

export const generated = () => {
  return <Notification />
}

export default {
  title: 'Components/Notification',
  component: Notification,
}
