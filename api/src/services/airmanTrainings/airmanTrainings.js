import { db } from 'src/lib/db'

export const airmanTrainings = () => {
  return db.airmanTraining.findMany()
}

export const airmanTraining = ({ id }) => {
  return db.airmanTraining.findUnique({
    where: { id },
  })
}

export const createAirmanTraining = ({ input }) => {
  return db.airmanTraining.create({
    data: input,
  })
}

export const updateAirmanTraining = ({ id, input }) => {
  return db.airmanTraining.update({
    data: input,
    where: { id },
  })
}

export const deleteAirmanTraining = ({ id }) => {
  return db.airmanTraining.delete({
    where: { id },
  })
}

export const AirmanTraining = {
  airman: (_obj, { root }) => {
    return db.airmanTraining.findUnique({ where: { id: root?.id } }).airman()
  },
  training: (_obj, { root }) => {
    return db.airmanTraining.findUnique({ where: { id: root?.id } }).training()
  },
}
