import { db } from 'src/lib/db'

export const trainingCollections = () => {
  return db.trainingCollection.findMany()
}

export const trainingCollection = ({ id }) => {
  return db.trainingCollection.findUnique({
    where: { id },
  })
}

export const createTrainingCollection = ({ input }) => {
  return db.trainingCollection.create({
    data: input,
  })
}

export const updateTrainingCollection = ({ id, input }) => {
  return db.trainingCollection.update({
    data: input,
    where: { id },
  })
}

export const deleteTrainingCollection = ({ id }) => {
  return db.trainingCollection.delete({
    where: { id },
  })
}

export const TrainingCollection = {
  training: (_obj, { root }) => {
    return db.trainingCollection
      .findUnique({ where: { id: root?.id } })
      .training()
  },
  collection: (_obj, { root }) => {
    return db.trainingCollection
      .findUnique({ where: { id: root?.id } })
      .collection()
  },
}
