import { db } from 'src/lib/db'

export const collections = () => {
  return db.Collection.findMany()
}

export const collection = ({ id }) => {
  return db.Collection.findUnique({
    where: { id },
  })
}

export const createCollection = ({ input }) => {
  return db.Collection.create({
    data: input,
  })
}

export const updateCollection = ({ id, input }) => {
  return db.Collection.update({
    data: input,
    where: { id },
  })
}

export const deleteCollection = ({ id }) => {
  return db.Collection.delete({
    where: { id },
  })
}

export const Collection = {
  trainingsObj: (_obj, { root }) => {
    return db.Collection.findUnique({ where: { id: root?.id } }).trainingsObj()
  },
}
