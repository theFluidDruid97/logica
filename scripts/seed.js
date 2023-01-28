import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/api'

export default async () => {
  try {
    const roles = [{ name: 'admin' }, { name: 'monitor' }]

    for (let role of roles) {
      await db.Role.create({
        data: {
          name: role.name,
        },
      })
    }

    const airmen = [
      {
        firstName: 'Gabriel',
        middleName: 'Michael',
        lastName: 'Adams',
        email: 'admin@mail.com',
        password: '244466666',
        roles: 'admin',
        organization: '377 SFS',
        dodId: '1234567890',
        rank: 'SrA',
        officeSymbol: 'S3OE',
        supervisorId: undefined,
        monitorId: 3,
      },
      {
        firstName: 'John',
        middleName: 'Jacob',
        lastName: 'Jingleheimer',
        email: 'airman@mail.com',
        password: '246',
        roles: null,
        organization: '377 SFS',
        dodId: '9876543210',
        rank: 'Amn',
        officeSymbol: 'S3OE',
        supervisorId: 1,
        monitorId: 3,
      },
      {
        firstName: 'Jane',
        middleName: 'Anne',
        lastName: 'Doe',
        email: 'monitor@mail.com',
        password: '2468',
        roles: 'monitor',
        organization: '377 SFS',
        dodId: '7894561230',
        rank: 'SSgt',
        officeSymbol: 'S4A',
        supervisorId: undefined,
        monitorId: undefined,
      },
    ]

    for (let airman of airmen) {
      const [hashedPassword, salt] = hashPassword(airman.password)
      await db.Airman.create({
        data: {
          firstName: airman.firstName,
          middleName: airman.middleName,
          lastName: airman.lastName,
          email: airman.email,
          hashedPassword: hashedPassword,
          salt: salt,
          roles: airman.roles,
          organization: airman.organization,
          officeSymbol: airman.officeSymbol,
          dodId: airman.dodId,
          rank: airman.rank,
          supervisorId: airman.supervisorId,
          monitorId: airman.monitorId,
        },
      })
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
