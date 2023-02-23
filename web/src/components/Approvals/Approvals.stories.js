// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Approvals {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Approvals from './Approvals'

export const generated = () => {
  return <Approvals />
}

export default {
  title: 'Components/Approvals',
  component: Approvals,
}
