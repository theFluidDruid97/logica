import { db } from 'src/lib/db'

export const trainings = () => {
  return db.Training.findMany()
}

export const training = ({ id }) => {
  return db.Training.findUnique({
    where: { id },
  })
}

export const createTraining = ({ input }) => {
  return db.Training.create({
    data: input,
  })
}

export const updateTraining = ({ id, input }) => {
  return db.Training.update({
    data: input,
    where: { id },
  })
}

export const deleteTraining = ({ id }) => {
  return db.Training.delete({
    where: { id },
  })
}

export const Training = {
  Collection: (_obj, { root }) => {
    return db.Training.findUnique({ where: { id: root?.id } }).Collection()
  },
}
