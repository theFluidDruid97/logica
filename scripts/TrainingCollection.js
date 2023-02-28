import { faker } from '@faker-js/faker'

export const trainingCollections = []

const repeat = (func, times) => {
    func()
    times && --times && repeat(func, times)
  }

const createTrainingCollections = () => {

  trainingCollections.push({
    collectionId: faker.datatype.number({
      min: 1,
      max: 1,
      allowLeadingZeros: false,
    }),
    trainingId: faker.datatype.number({
      min: 1,
      max: 1,
      allowLeadingZeros: false,
    }),
  })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 1,
        max: 1,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 1,
        max: 1,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 3,
        max: 3,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 4,
        max: 4,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 5,
        max: 5,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 6,
        max: 6,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 7,
        max: 7,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 8,
        max: 8,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 9,
        max: 9,
        allowLeadingZeros: false,
      }),
    })

    trainingCollections.push({
      collectionId: faker.datatype.number({
        min: 2,
        max: 2,
        allowLeadingZeros: false,
      }),
      trainingId: faker.datatype.number({
        min: 10,
        max: 10,
        allowLeadingZeros: false,
      }),
    })
}

repeat(createTrainingCollections, 1)

