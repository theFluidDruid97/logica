// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <DrawerListItemsAdmin {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import DrawerListItemsAdmin from './DrawerListItemsAdmin'

export const generated = () => {
  return <DrawerListItemsAdmin />
}

export default {
  title: 'Components/DrawerListItemsAdmin',
  component: DrawerListItemsAdmin,
}
