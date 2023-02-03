import {
  collections,
  collection,
  createCollection,
  updateCollection,
  deleteCollection,
} from './collections'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('collections', () => {
  scenario('returns all collections', async (scenario) => {
    const result = await collections()

    expect(result.length).toEqual(Object.keys(scenario.collection).length)
  })

  scenario('returns a single collection', async (scenario) => {
    const result = await collection({ id: scenario.collection.one.id })

    expect(result).toEqual(scenario.collection.one)
  })

  scenario('creates a collection', async () => {
    const result = await createCollection({
      input: { name: 'String4344639' },
    })

    expect(result.name).toEqual('String4344639')
  })

  scenario('updates a collection', async (scenario) => {
    const original = await collection({
      id: scenario.collection.one.id,
    })
    const result = await updateCollection({
      id: original.id,
      input: { name: 'String79181022' },
    })

    expect(result.name).toEqual('String79181022')
  })

  scenario('deletes a collection', async (scenario) => {
    const original = await deleteCollection({
      id: scenario.collection.one.id,
    })
    const result = await collection({ id: original.id })

    expect(result).toEqual(null)
  })
})
