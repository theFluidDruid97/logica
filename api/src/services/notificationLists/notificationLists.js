import { db } from 'src/lib/db'

export const notificationLists = () => {
  return db.notificationList.findMany()
}

export const notificationList = ({ id }) => {
  return db.notificationList.findUnique({
    where: { id },
  })
}

export const createNotificationList = ({ input }) => {
  return db.notificationList.create({
    data: input,
  })
}

export const updateNotificationList = ({ id, input }) => {
  return db.notificationList.update({
    data: input,
    where: { id },
  })
}

export const deleteNotificationList = ({ id }) => {
  return db.notificationList.delete({
    where: { id },
  })
}

export const NotificationList = {
  airman: (_obj, { root }) => {
    return db.notificationList.findUnique({ where: { id: root?.id } }).airman()
  },
}
