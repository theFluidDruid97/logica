import { db } from 'src/lib/db'

export const airmen = () => {
  return db.airman.findMany()
}

export const airman = ({ id }) => {
  return db.airman.findUnique({
    where: { id },
  })
}

export const createAirman = ({ input }) => {
  return db.airman.create({
    data: input,
  })
}

export const updateAirman = ({ id, input }) => {
  return db.airman.update({
    data: input,
    where: { id },
  })
}

export const deleteAirman = ({ id }) => {
  return db.airman.delete({
    where: { id },
  })
}

export const Airman = {
  Role: (_obj, { root }) => {
    return db.airman.findUnique({ where: { id: root?.id } }).Role()
  },
}
