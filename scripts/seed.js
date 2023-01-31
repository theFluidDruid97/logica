import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/api'

import { airmen } from './airmen.js'

export default async () => {
  try {
    const roles = [
      { name: 'Admin' },
      { name: 'Monitor' },
      { name: 'Supervisor' },
    ]

    const trainings = [
      {
        name: 'M240B',
        duration: 12,
        link: 'https://fnamerica.com/training/courses/fn-m240-armorer-course/',
        description:
          'Explain and demonstrate the removal, disassembly, repair and/or replacement of component parts. Conduct the appropriate inspection, gauging and adjustment of the FN® M240.',
      },
      {
        name: 'Cyber Awareness',
        duration: 12,
        link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
        description:
          'The purpose of the Cyber Awareness Challenge is to influence behavior, focusing on actions that authorized users can engage to mitigate threats and vulnerabilities to DoD Information Systems. This training is current, designed to be engaging, and relevant to the user.',
      },
    ]

    const collections = [{ name: '377 SFS MQL' }, { name: 'General' }]

    for (let airman of airmen) {
      const [hashedPassword, salt] = hashPassword(airman.password)
      await db.airman.create({
        data: {
          email: airman.email,
          hashedPassword,
          salt,
          rank: airman.rank,
          firstName: airman.firstName,
          middleName: airman.middleName,
          lastName: airman.lastName,
          organization: airman.organization,
          officeSymbol: airman.officeSymbol,
          dodId: airman.dodId,
        },
      })
    }
    console.log(
      'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv ROLES vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
    )
    setTimeout(() => {
      roles.map(async (data) => {
        const roleRecord = await db.role.create({ data })
        console.log(roleRecord)
      })
    }, 250)
    setTimeout(() => {
      console.log(
        '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ROLES ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
      )
    }, 350)
    setTimeout(() => {
      console.log(
        'vvvvvvvvvvvvvvvvvvvvvvvvvvvv TRAININGS vvvvvvvvvvvvvvvvvvvvvvvvvvvv'
      )
    }, 450)
    setTimeout(() => {
      trainings.map(async (data) => {
        const trainingRecord = await db.training.create({ data })
        console.log(trainingRecord)
      })
    }, 500)
    setTimeout(() => {
      console.log(
        '^^^^^^^^^^^^^^^^^^^^^^^^^^^^ TRAININGS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
      )
    }, 550)
    setTimeout(() => {
      console.log(
        'vvvvvvvvvvvvvvvvvvvvvvvvvvv COLLECTIONS vvvvvvvvvvvvvvvvvvvvvvvvvvv'
      )
    }, 700)
    setTimeout(() => {
      collections.map(async (data) => {
        const collectionRecord = await db.collection.create({ data })
        console.log(collectionRecord)
      })
    }, 750)
    setTimeout(() => {
      console.log(
        '^^^^^^^^^^^^^^^^^^^^^^^^^^^ COLLECTIONS ^^^^^^^^^^^^^^^^^^^^^^^^^^^'
      )
    }, 800)
    setTimeout(async () => {
      const admin = await db.airman.update({
        where: { id: 1 },
        data: { roles: { connect: { name: 'Admin' } } },
      })
      console.log(
        'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv ADMIN vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
      )
      console.log(admin)
      console.log(
        '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ADMIN ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
      )
    }, 1000)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
