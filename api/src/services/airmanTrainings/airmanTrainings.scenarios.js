export const standard = defineScenario({
  airmanTraining: {
    one: {
      data: {
        airman: { create: { email: 'String9600548' } },
        training: { create: { name: 'String7040268' } },
      },
    },
    two: {
      data: {
        airman: { create: { email: 'String9810333' } },
        training: { create: { name: 'String134315' } },
      },
    },
  },
})
