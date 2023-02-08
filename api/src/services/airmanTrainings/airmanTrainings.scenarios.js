export const standard = defineScenario({
  airmanTraining: {
    one: {
      data: {
        airman: {
          create: {
            email: 'String4869669',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        training: { create: { name: 'String9694428' } },
      },
    },
    two: {
      data: {
        airman: {
          create: {
            email: 'String5136494',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        training: { create: { name: 'String8197747' } },
      },
    },
  },
})
