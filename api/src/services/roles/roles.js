import { db } from 'src/lib/db'

export const roles = () => {
  return db.Role.findMany()
}

export const role = ({ id }) => {
  return db.Role.findUnique({
    where: { id },
  })
}

export const createRole = ({ input }) => {
  return db.Role.create({
    data: input,
  })
}

export const updateRole = ({ id, input }) => {
  return db.Role.update({
    data: input,
    where: { id },
  })
}

export const deleteRole = ({ id }) => {
  return db.Role.delete({
    where: { id },
  })
}

export const Role = {
  Airman: (_obj, { root }) => {
    return db.Role.findUnique({ where: { id: root?.id } }).Airman()
  },
}
