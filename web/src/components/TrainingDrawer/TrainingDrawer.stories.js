// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <TrainingDrawer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import TrainingDrawer from './TrainingDrawer'

export const generated = () => {
  return <TrainingDrawer />
}

export default {
  title: 'Components/TrainingDrawer',
  component: TrainingDrawer,
}
