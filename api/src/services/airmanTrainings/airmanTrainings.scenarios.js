export const standard = defineScenario({
  airmanTraining: {
    one: {
      data: {
        airman: { create: { email: 'String5827056' } },
        training: { create: { name: 'String7255365' } },
      },
    },
    two: {
      data: {
        airman: { create: { email: 'String7221920' } },
        training: { create: { name: 'String8713992' } },
      },
    },
  },
})
