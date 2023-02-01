import { db } from 'src/lib/db'

export const collections = () => {
  return db.collection.findMany()
}

export const collection = ({ id }) => {
  return db.collection.findUnique({
    where: { id },
  })
}

export const createCollection = ({ input }) => {
  return db.collection.create({
    data: input,
  })
}

export const updateCollection = ({ id, input }) => {
  return db.collection.update({
    data: input,
    where: { id },
  })
}

export const deleteCollection = ({ id }) => {
  return db.collection.delete({
    where: { id },
  })
}

export const Collection = {
  training: (_obj, { root }) => {
    return db.collection.findUnique({ where: { id: root?.id } }).training()
  },
}
