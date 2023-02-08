import {
  trainings,
  training,
  createTraining,
  updateTraining,
  deleteTraining,
} from './trainings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('trainings', () => {
  scenario('returns all trainings', async (scenario) => {
    const result = await trainings()

    expect(result.length).toEqual(Object.keys(scenario.training).length)
  })

  scenario('returns a single training', async (scenario) => {
    const result = await training({ id: scenario.training.one.id })

    expect(result).toEqual(scenario.training.one)
  })

  scenario('creates a training', async () => {
    const result = await createTraining({
      input: { name: 'String6289319' },
    })

    expect(result.name).toEqual('String6289319')
  })

  scenario('updates a training', async (scenario) => {
    const original = await training({
      id: scenario.training.one.id,
    })
    const result = await updateTraining({
      id: original.id,
      input: { name: 'String23267502' },
    })

    expect(result.name).toEqual('String23267502')
  })

  scenario('deletes a training', async (scenario) => {
    const original = await deleteTraining({
      id: scenario.training.one.id,
    })
    const result = await training({ id: original.id })

    expect(result).toEqual(null)
  })
})
