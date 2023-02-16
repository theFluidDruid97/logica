import {
  notificationLists,
  notificationList,
  createNotificationList,
  updateNotificationList,
  deleteNotificationList,
} from './notificationLists'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('notificationLists', () => {
  scenario('returns all notificationLists', async (scenario) => {
    const result = await notificationLists()

    expect(result.length).toEqual(Object.keys(scenario.notificationList).length)
  })

  scenario('returns a single notificationList', async (scenario) => {
    const result = await notificationList({
      id: scenario.notificationList.one.id,
    })

    expect(result).toEqual(scenario.notificationList.one)
  })

  scenario('creates a notificationList', async (scenario) => {
    const result = await createNotificationList({
      input: {
        airmanId: scenario.notificationList.two.airmanId,
        messsage: 'String',
      },
    })

    expect(result.airmanId).toEqual(scenario.notificationList.two.airmanId)
    expect(result.messsage).toEqual('String')
  })

  scenario('updates a notificationList', async (scenario) => {
    const original = await notificationList({
      id: scenario.notificationList.one.id,
    })
    const result = await updateNotificationList({
      id: original.id,
      input: { messsage: 'String2' },
    })

    expect(result.messsage).toEqual('String2')
  })

  scenario('deletes a notificationList', async (scenario) => {
    const original = await deleteNotificationList({
      id: scenario.notificationList.one.id,
    })
    const result = await notificationList({ id: original.id })

    expect(result).toEqual(null)
  })
})
