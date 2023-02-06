import {
  trainingCollections,
  trainingCollection,
  createTrainingCollection,
  updateTrainingCollection,
  deleteTrainingCollection,
} from './trainingCollections'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('trainingCollections', () => {
  scenario('returns all trainingCollections', async (scenario) => {
    const result = await trainingCollections()

    expect(result.length).toEqual(
      Object.keys(scenario.trainingCollection).length
    )
  })

  scenario('returns a single trainingCollection', async (scenario) => {
    const result = await trainingCollection({
      id: scenario.trainingCollection.one.id,
    })

    expect(result).toEqual(scenario.trainingCollection.one)
  })

  scenario('creates a trainingCollection', async (scenario) => {
    const result = await createTrainingCollection({
      input: {
        trainingId: scenario.trainingCollection.two.trainingId,
        collectionId: scenario.trainingCollection.two.collectionId,
      },
    })

    expect(result.trainingId).toEqual(
      scenario.trainingCollection.two.trainingId
    )

    expect(result.collectionId).toEqual(
      scenario.trainingCollection.two.collectionId
    )
  })

  scenario('updates a trainingCollection', async (scenario) => {
    const original = await trainingCollection({
      id: scenario.trainingCollection.one.id,
    })
    const result = await updateTrainingCollection({
      id: original.id,
      input: { trainingId: scenario.trainingCollection.two.trainingId },
    })

    expect(result.trainingId).toEqual(
      scenario.trainingCollection.two.trainingId
    )
  })

  scenario('deletes a trainingCollection', async (scenario) => {
    const original = await deleteTrainingCollection({
      id: scenario.trainingCollection.one.id,
    })
    const result = await trainingCollection({ id: original.id })

    expect(result).toEqual(null)
  })
})
