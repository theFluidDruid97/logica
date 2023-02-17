// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NotificationFunction {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NotificationFunction from './NotificationFunctions'

export const generated = () => {
  return <NotificationFunction />
}

export default {
  title: 'Components/NotificationFunction',
  component: NotificationFunction,
}
