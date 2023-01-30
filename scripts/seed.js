import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/api'

export default async () => {
  try {
    const roles = [
      { name: 'admin' },
      { name: 'monitor' },
      { name: 'leadership' },
    ]

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
        supervisorId: null,
        monitorId: null,
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
        supervisorId: null,
        monitorId: null,
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
        supervisorId: null,
        monitorId: null,
      },
      {
        firstName: 'Timothy',
        middleName: 'Randall',
        lastName: 'Fletcher',
        email: 'chief@mail.com',
        password: '246810',
        roles: 'leadership',
        organization: '377 SFS',
        dodId: '1593572580',
        rank: 'CMSgt',
        officeSymbol: 'S3O',
        supervisorId: null,
        monitorId: null,
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

    const collections = [{ name: '377 SFS MQL' }, { name: 'General' }]

    for (let collection of collections) {
      await db.Collection.create({
        data: {
          name: collection.name,
        },
      })
    }

    const trainings = [
      {
        name: 'M240B',
        duration: 12,
        link: 'https://fnamerica.com/training/courses/fn-m240-armorer-course/',
        description:
          'Explain and demonstrate the removal, disassembly, repair and/or replacement of component parts. Conduct the appropriate inspection, gauging and adjustment of the FN® M240.',
        collections: '377 SFS MQL',
      },
      {
        name: 'Cyber Awareness',
        duration: 12,
        link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
        description:
          'The purpose of the Cyber Awareness Challenge is to influence behavior, focusing on actions that authorized users can engage to mitigate threats and vulnerabilities to DoD Information Systems. This training is current, designed to be engaging, and relevant to the user.',
        collections: 'General',
      },
    ]

    for (let training of trainings) {
      await db.training.create({
        data: {
          name: training.name,
          duration: training.duration,
          link: training.link,
          description: training.description,
          collections: training.collections,
        },
      })
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
