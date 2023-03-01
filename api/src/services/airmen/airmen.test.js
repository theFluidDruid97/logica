import {
  airmen,
  airman,
  createAirman,
  updateAirman,
  deleteAirman,
} from './airmen'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('airmen', () => {
  scenario('returns all airmen', async (scenario) => {
    const result = await airmen()

    expect(result.length).toEqual(Object.keys(scenario.airman).length)
  })

  scenario('returns a single airman', async (scenario) => {
    const result = await airman({ id: scenario.airman.one.id })

    expect(result).toEqual(scenario.airman.one)
  })

  scenario('creates a airman', async () => {
    const result = await createAirman({
      input: { email: 'String3841557' },
    })

    expect(result.email).toEqual('String3841557')
  })

  scenario('updates a airman', async (scenario) => {
    const original = await airman({ id: scenario.airman.one.id })
    const result = await updateAirman({
      id: original.id,
      input: { email: 'String69717032' },
    })

    expect(result.email).toEqual('String69717032')
  })

  scenario('deletes a airman', async (scenario) => {
    const original = await deleteAirman({
      id: scenario.airman.one.id,
    })
    const result = await airman({ id: original.id })

    expect(result).toEqual(null)
  })
})
