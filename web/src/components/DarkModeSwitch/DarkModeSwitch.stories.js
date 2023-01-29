// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <DarkModeSwitch {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import DarkModeSwitch from './DarkModeSwitch'

export const generated = () => {
  return <DarkModeSwitch />
}

export default {
  title: 'Components/DarkModeSwitch',
  component: DarkModeSwitch,
}
