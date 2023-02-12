import { db } from 'src/lib/db'

export const certificates = () => {
  return db.certificate.findMany()
}

export const certificate = ({ id }) => {
  return db.certificate.findUnique({
    where: { id },
  })
}

export const createCertificate = ({ input }) => {
  return db.certificate.create({
    data: input,
  })
}

export const updateCertificate = ({ id, input }) => {
  return db.certificate.update({
    data: input,
    where: { id },
  })
}

export const deleteCertificate = ({ id }) => {
  return db.certificate.delete({
    where: { id },
  })
}

export const Certificate = {
  airman: (_obj, { root }) => {
    return db.certificate.findUnique({ where: { id: root?.id } }).airman()
  },
  training: (_obj, { root }) => {
    return db.certificate.findUnique({ where: { id: root?.id } }).training()
  },
}
