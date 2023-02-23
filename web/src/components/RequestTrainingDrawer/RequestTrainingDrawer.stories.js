// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <RequestTrainingDrawer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import RequestTrainingDrawer from './RequestTrainingDrawer'

export const generated = () => {
  return <RequestTrainingDrawer />
}

export default {
  title: 'Components/RequestTrainingDrawer',
  component: RequestTrainingDrawer,
}
