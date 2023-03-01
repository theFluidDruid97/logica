export const standard = defineScenario({
  airmanTraining: {
    one: {
      data: {
        airman: { create: { email: 'String8336006' } },
        training: { create: { name: 'String3775965' } },
      },
    },
    two: {
      data: {
        airman: { create: { email: 'String173575' } },
        training: { create: { name: 'String1449302' } },
      },
    },
  },
})
