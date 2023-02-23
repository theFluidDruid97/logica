import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/api'

import { airmen } from './airmen.js'
import { collections } from './collections.js'
import { trainings } from './trainings.js'
import { airmanTrainings } from './trainings.js'

// import { faker } from '@faker-js/faker';

let trainingsCount = 0
let collectionsCount = 0
let airmanCount = 0
let airmanTrainingCount = 0
const defaultPassword = '123'
const adminEmail = 'admin@mail.com'
const adminPassword = '1776'
const [hashedPassword, salt] = hashPassword(adminPassword)
const admin = {
  email: adminEmail,
  hashedPassword,
  salt,
  rank: 'POTUS',
  firstName: 'John',
  middleName: 'Fitzgerald',
  lastName: 'Kennedy',
  organization: '407 USA',
  officeSymbol: 'OVL',
  dodId: '1234567890',
  afsc: '6T971',
  roles: 'Admin',
}

const createAirmen = async (airmen) => {
  for (let airman of airmen) {
    const [hashedPassword, salt] = hashPassword(defaultPassword)
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
        afsc: airman.afsc,
      },
    })
    airmanCount = airmanCount + 1
  }
  console.log(
    `\n\n\t ________________________________\n\t|\t\t\t\t |\n\t|    ADMIN LOGIN INFORMATION\t |\n\t|\t\t\t\t |\n\t| EMAIL\t\t\tPASSWORD |\n\t| ${adminEmail}\t${adminPassword}\t |\n\t|________________________________|\n\n\n\n\tDEFAULT PASSWORD\t${defaultPassword}\n\n\tAIRMEN CREATED\t\t${airmanCount}\n\n\tTRAININGS CREATED\t${trainingsCount}\n\n\tCOLLECTIONS CREATED\t${collectionsCount}\n\n`
  )
}

const createAirmenTrainings = async (airmanTrainings) => {
  for (let airmanTraining of airmanTrainings) {
  await db.airmanTraining.create({
    data: {
      airmanId: airmanTraining.airmanId,
      trainingId: airmanTraining.trainingId,
      status: airmanTraining.status,
      start: airmanTraining.start,
      end: airmanTraining.end,
    },
  })
  airmanTrainingCount = airmanTrainingCount + 1
  }
  console.log(
    `\tAIRMAN TRAININGS CREATED\t${airmanTrainingCount}\n\n`
  )
}

export default async () => {
  try {
    await db.airman.create({ data: admin })
    airmanCount = airmanCount + 1

    trainings.map(async (data) => {
      trainingsCount = trainingsCount + 1
      await db.training.create({ data })
    })

    collections.map(async (data) => {
      collectionsCount = collectionsCount + 1
      await db.collection.create({ data })
    })

    await createAirmen(airmen)
    createAirmenTrainings(airmanTrainings)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
