// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <DrawerListItems {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import DrawerListItems from './DrawerListItems'

export const generated = () => {
  return <DrawerListItems />
}

export default {
  title: 'Components/DrawerListItems',
  component: DrawerListItems,
}
