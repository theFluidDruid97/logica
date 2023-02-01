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
      input: { name: 'String7007311', duration: 7927412 },
    })

    expect(result.name).toEqual('String7007311')
    expect(result.duration).toEqual(7927412)
  })

  scenario('updates a training', async (scenario) => {
    const original = await training({
      id: scenario.training.one.id,
    })
    const result = await updateTraining({
      id: original.id,
      input: { name: 'String20975782' },
    })

    expect(result.name).toEqual('String20975782')
  })

  scenario('deletes a training', async (scenario) => {
    const original = await deleteTraining({
      id: scenario.training.one.id,
    })
    const result = await training({ id: original.id })

    expect(result).toEqual(null)
  })
})
