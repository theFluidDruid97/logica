import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/api'

import { airmen } from './airmen.js'
import { collections } from './collections.js'
import { monitors } from './monitors.js'
import { trainings } from './trainings.js'
import { airmanTrainings } from './trainings.js'
import { trainingCollections } from './TrainingCollection.js'


let trainingsCount = 0
let collectionsCount = 0
let airmanCount = 0
let airmanTrainingCount = 0
let trainingCollectionCount = 0
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

const monitor1 = {
  email: "dustin.iverson.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Dustin',
  middleName: 'William',
  lastName: 'Iverson',
  organization: '2 AMXS',
  officeSymbol: 'A1A',
  dodId: '2758016437',
  afsc: '2A551',
  roles: 'Monitor'
  }

const monitor2 = {
  email: "nick.sibus.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Nicholas',
  middleName: 'Nick',
  lastName: 'Sibus',
  organization: '2 AMXS',
  officeSymbol: 'A1A',
  dodId: '8016437104',
  afsc: '2A551',
  roles: 'Monitor'
}

const monitor3 = {
  email: "john.noah.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'John',
  middleName: 'Joseph',
  lastName: 'Noah',
  organization: '8 FS',
  officeSymbol: 'F1A',
  dodId: '4371042341',
  afsc: '2A951',
  roles: 'Monitor'
}

const monitor4 = {
  email: "cody.carrell.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Cody',
  middleName: 'Wade',
  lastName: 'Carrell',
  organization: '8 FS',
  officeSymbol: 'F1A',
  dodId: '4323418897',
  afsc: '2A951',
  roles: 'Monitor'
}

const monitor5 = {
  email: "billy.bob.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'BillyBob',
  middleName: 'Bobby',
  lastName: 'JimBob',
  organization: '67 SOS',
  officeSymbol: 'S1A',
  dodId: '0987789054',
  afsc: '3P0X1',
  roles: 'Monitor'
}

const monitor6 = {
  email: "ernest.foster.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Ernest',
  middleName: 'NMN',
  lastName: 'Foster',
  organization: '67 SOS',
  officeSymbol: 'S1A',
  dodId: '0911119054',
  afsc: '3P0X1',
  roles: 'Monitor'
}

const monitor7 = {
  email: "kayla.smith.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Kayla',
  middleName: 'Marie',
  lastName: 'Smith',
  organization: '96 BS',
  officeSymbol: 'S1A',
  dodId: '2105632793',
  afsc: '1T0X1',
  roles: 'Monitor'
}

const monitor8 = {
  email: "natalie.davis.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Natalie',
  middleName: 'May',
  lastName: 'Davis',
  organization: '96 BS',
  officeSymbol: 'S1A',
  dodId: '2107220810',
  afsc: '1T0X1',
  roles: 'Monitor'
}

const monitor9 = {
  email: "emilia.willis.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Emilia',
  middleName: 'Kay',
  lastName: 'Willis',
  organization: '343 BS',
  officeSymbol: 'B1A',
  dodId: '3344550876',
  afsc: '3P0X1',
  roles: 'Monitor'
}

const monitor10 = {
  email: "goku.son.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Goku',
  middleName: 'Kakarot',
  lastName: 'Son',
  organization: '343 BS',
  officeSymbol: 'B1A',
  dodId: '3256841001',
  afsc: '3P0X1',
  roles: 'Monitor'
}

const monitor11 = {
  email: "andrew.jackson.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Andrew',
  middleName: 'NMN',
  lastName: 'Jackson',
  organization: '377 SFS',
  officeSymbol: 'S1A',
  dodId: '4329817288',
  afsc: '4Y0X1',
  roles: 'Monitor'
}

const monitor12 = {
  email: "george.washington.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'George',
  middleName: 'NMN',
  lastName: 'Washington',
  organization: '377 SFS',
  officeSymbol: 'S1A',
  dodId: '6608213321',
  afsc: '4Y0X1',
  roles: 'Monitor'
}

const monitor13 = {
  email: "chris.stephens.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Chris',
  middleName: 'Jim',
  lastName: 'Stephens',
  organization: '701 MUNS',
  officeSymbol: 'M1A',
  dodId: '9871235208',
  afsc: '5J0X1',
  roles: 'Monitor'
}

const monitor14 = {
  email: "joey.reynolds.1@us.af.mil",
  hashedPassword,
  salt,
  rank: 'SSgt',
  firstName: 'Joey',
  middleName: 'Michael',
  lastName: 'Reynolds',
  organization: '701 MUNS',
  officeSymbol: 'M1A',
  dodId: '8734610001',
  afsc: '5J0X1',
  roles: 'Monitor'
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
        roles: airman.roles,
      },
    })
    airmanCount = airmanCount + 1
  }
  console.log(
    `\n\n\t ________________________________\n\t|\t\t\t\t |\n\t|    ADMIN LOGIN INFORMATION\t |\n\t|\t\t\t\t |\n\t| EMAIL\t\t\tPASSWORD |\n\t| ${adminEmail}\t${adminPassword}\t |\n\t|________________________________|\n\n\n\n\tDEFAULT PASSWORD\t${defaultPassword}\n\n\tAIRMEN CREATED\t\t${airmanCount}\n\n\tTRAININGS CREATED\t${trainingsCount}\n\n\tCOLLECTIONS CREATED\t${collectionsCount}\n`
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
  console.log(`\tAIRMAN TRAININGS CREATED\t${airmanTrainingCount}\n`)
}

const createTrainingCollections = async (trainingCollections) => {
  for (let trainingCollection of trainingCollections) {
    await db.trainingCollection.create({
      data: {
        trainingId: trainingCollection.trainingId,
        collectionId: trainingCollection.collectionId,
      },
    })
    trainingCollectionCount = trainingCollectionCount + 1
  }
  console.log(`\tTRAININGS ASSIGNED TO COLLECTIONS\t${trainingCollectionCount}\n\n`)
}

export default async () => {
  try {
    await db.airman.create({ data: admin })
    airmanCount = airmanCount + 1

    monitors.map(async (data) => {
      airmanCount = airmanCount + 1
      await db.airman.create({ data })
    })

    trainings.map(async (data) => {
      trainingsCount = trainingsCount + 1
      await db.training.create({ data })
    })

    collections.map(async (data) => {
      collectionsCount = collectionsCount + 1
      await db.collection.create({ data })
    })

    await createAirmen(airmen)
    await createAirmenTrainings(airmanTrainings)
    await createTrainingCollections(trainingCollections)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
