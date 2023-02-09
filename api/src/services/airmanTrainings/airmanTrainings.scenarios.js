export const standard = defineScenario({
  airmanTraining: {
    one: {
      data: {
        airman: {
          create: {
            email: 'String9339026',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        training: { create: { name: 'String6237850' } },
      },
    },
    two: {
      data: {
        airman: {
          create: {
            email: 'String3796475',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        training: { create: { name: 'String2711292' } },
      },
    },
  },
})
