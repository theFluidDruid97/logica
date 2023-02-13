export const standard = defineScenario({
  airmanTraining: {
    one: {
      data: {
        start: '2023-02-13T00:53:28.473Z',
        end: '2023-02-13T00:53:28.473Z',
        airman: {
          create: {
            email: 'String3438002',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        training: { create: { name: 'String760212' } },
      },
    },
    two: {
      data: {
        start: '2023-02-13T00:53:28.473Z',
        end: '2023-02-13T00:53:28.473Z',
        airman: {
          create: {
            email: 'String6058359',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        training: { create: { name: 'String4653713' } },
      },
    },
  },
})
