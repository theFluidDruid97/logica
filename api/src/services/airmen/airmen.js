import { db } from 'src/lib/db'

export const airmen = () => {
  return db.Airman.findMany()
}

export const airman = ({ id }) => {
  return db.Airman.findUnique({
    where: { id },
  })
}

export const createAirman = ({ input }) => {
  return db.Airman.create({
    data: input,
  })
}

export const updateAirman = ({ id, input }) => {
  return db.Airman.update({
    data: input,
    where: { id },
  })
}

export const deleteAirman = ({ id }) => {
  return db.Airman.delete({
    where: { id },
  })
}

export const Airman = {
  roleObj: (_obj, { root }) => {
    return db.Airman.findUnique({ where: { id: root?.id } }).roleObj()
  },
}
