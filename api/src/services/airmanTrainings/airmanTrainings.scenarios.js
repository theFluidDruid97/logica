export const standard = defineScenario({
  airmanTraining: {
    one: {
      data: {
        airman: { create: { email: 'String5116942' } },
        training: { create: { name: 'String8372519' } },
      },
    },
    two: {
      data: {
        airman: { create: { email: 'String333551' } },
        training: { create: { name: 'String1337651' } },
      },
    },
  },
})
