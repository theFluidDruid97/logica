import {
  certificates,
  certificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from './certificates'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('certificates', () => {
  scenario('returns all certificates', async (scenario) => {
    const result = await certificates()

    expect(result.length).toEqual(Object.keys(scenario.certificate).length)
  })

  scenario('returns a single certificate', async (scenario) => {
    const result = await certificate({ id: scenario.certificate.one.id })

    expect(result).toEqual(scenario.certificate.one)
  })

  scenario('creates a certificate', async (scenario) => {
    const result = await createCertificate({
      input: {
        airmanId: scenario.certificate.two.airmanId,
        trainingId: scenario.certificate.two.trainingId,
        url: 'String',
        completion: '2023-02-24T16:52:51.310Z',
      },
    })

    expect(result.airmanId).toEqual(scenario.certificate.two.airmanId)
    expect(result.trainingId).toEqual(scenario.certificate.two.trainingId)
    expect(result.url).toEqual('String')
    expect(result.completion).toEqual(new Date('2023-02-24T16:52:51.310Z'))
  })

  scenario('updates a certificate', async (scenario) => {
    const original = await certificate({
      id: scenario.certificate.one.id,
    })
    const result = await updateCertificate({
      id: original.id,
      input: { url: 'String2' },
    })

    expect(result.url).toEqual('String2')
  })

  scenario('deletes a certificate', async (scenario) => {
    const original = await deleteCertificate({
      id: scenario.certificate.one.id,
    })
    const result = await certificate({ id: original.id })

    expect(result).toEqual(null)
  })
})
