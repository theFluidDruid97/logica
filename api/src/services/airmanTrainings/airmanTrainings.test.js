import {
  airmanTrainings,
  airmanTraining,
  createAirmanTraining,
  updateAirmanTraining,
  deleteAirmanTraining,
} from './airmanTrainings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('airmanTrainings', () => {
  scenario('returns all airmanTrainings', async (scenario) => {
    const result = await airmanTrainings()

    expect(result.length).toEqual(Object.keys(scenario.airmanTraining).length)
  })

  scenario('returns a single airmanTraining', async (scenario) => {
    const result = await airmanTraining({
      id: scenario.airmanTraining.one.id,
    })

    expect(result).toEqual(scenario.airmanTraining.one)
  })

  scenario('creates a airmanTraining', async (scenario) => {
    const result = await createAirmanTraining({
      input: {
        airmanId: scenario.airmanTraining.two.airmanId,
        trainingId: scenario.airmanTraining.two.trainingId,
        start: '2023-02-13T00:53:28.435Z',
        end: '2023-02-13T00:53:28.435Z',
      },
    })

    expect(result.airmanId).toEqual(scenario.airmanTraining.two.airmanId)
    expect(result.trainingId).toEqual(scenario.airmanTraining.two.trainingId)
    expect(result.start).toEqual(new Date('2023-02-13T00:53:28.435Z'))
    expect(result.end).toEqual(new Date('2023-02-13T00:53:28.435Z'))
  })

  scenario('updates a airmanTraining', async (scenario) => {
    const original = await airmanTraining({
      id: scenario.airmanTraining.one.id,
    })
    const result = await updateAirmanTraining({
      id: original.id,
      input: { start: '2023-02-14T00:53:28.435Z' },
    })

    expect(result.start).toEqual(new Date('2023-02-14T00:53:28.435Z'))
  })

  scenario('deletes a airmanTraining', async (scenario) => {
    const original = await deleteAirmanTraining({
      id: scenario.airmanTraining.one.id,
    })
    const result = await airmanTraining({ id: original.id })

    expect(result).toEqual(null)
  })
})
