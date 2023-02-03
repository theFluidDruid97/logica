import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/api'

// import { airmen } from './airmen.js' // UNCOMMENT THIS LINE AND "LOCAL AIRMEN" && COMMENT OUT "FETCH AIRMEN" TO PULL AIRMEN FROM LOCAL FILE || COMMENT OUT THIS LINE AND "LOCAL AIRMEN" && UNCOMMENT "FETCH AIRMEN" TO FETCH AIRMEN FROM API
import { collections } from './collections.js'
import { trainings } from './trainings.js'

const fetch = require('node-fetch')
const airmenUrl = 'https://api.json-generator.com/templates/Q-5TQXLBSY4B/data'
const airmenOptions = {
  headers: {
    Authorization: 'Bearer jdk9xh0p6mcym7pg9w2fleju883q9fyx66rabemj',
  },
}

let trainingsCount = 0
let collectionsCount = 0
let airmanCount = 0

// vv AIRMAN PASSWORD vv
const airmanPass = '123'
// ^^ AIRMAN PASSWORD ^^

// // vv LOCAL AIRMEN vv
// async function createAirmen() {
//   for (let airman of airmen) {
//     const [hashedPassword, salt] = hashPassword(airmanPass)
//     await db.airman.create({
//       data: {
//         email: airman.email,
//         hashedPassword,
//         salt,
//         rank: airman.rank,
//         firstName: airman.firstName,
//         middleName: airman.middleName,
//         lastName: airman.lastName,
//         organization: airman.organization,
//         officeSymbol: airman.officeSymbol,
//         dodId: airman.dodId,
//       },
//     })
//     airmanCount = airmanCount + 1
//   }
//   console.log(
//     `\n\n\t ________________________________\n\t|\t\t\t\t |\n\t|    ADMIN LOGIN INFORMATION\t |\n\t|\t\t\t\t |\n\t| EMAIL\t\t\tPASSWORD |\n\t| ${adminEmail}\t${adminPass}\t |\n\t|________________________________|\n\n\n\n\tAIRMAN PASSOWRD\t\t${airmanPass}\n\n\tTOTAL ACCOUNTS CREATED\t${airmanCount}\n\n\tTRAININGS CREATED\t${trainingsCount}\n\n\tCOLLECTIONS CREATED\t${collectionsCount}\n\n`
//   )
// }
// // ^^ LOCAL AIRMEN ^^

// vv FETCH AIRMEN vv
async function createAirmen() {
  await fetch(airmenUrl, airmenOptions)
    .then((res) => res.json())
    .then(async (airmen) => {
      for (let airman of airmen) {
        const [hashedPassword, salt] = hashPassword(airmanPass)
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
        airmanCount = airmanCount + 1
      }
    })
  console.log(
    `\n\n\t ________________________________\n\t|\t\t\t\t |\n\t|    ADMIN LOGIN INFORMATION\t |\n\t|\t\t\t\t |\n\t| EMAIL\t\t\tPASSWORD |\n\t| ${adminEmail}\t${adminPass}\t |\n\t|________________________________|\n\n\n\n\tAIRMAN PASSOWRD\t\t${airmanPass}\n\n\tTOTAL ACCOUNTS CREATED\t${airmanCount}\n\n\tTRAININGS CREATED\t${trainingsCount}\n\n\tCOLLECTIONS CREATED\t${collectionsCount}\n\n`
  )
}
// ^^ FETCH AIRMEN ^^

// vv ADMIN LOGIN INFORMATION vv
const adminEmail = 'admin@mail.com'
const adminPass = '1776'
// ^^ ADMIN LOGIN INFORMATION ^^
const [hashedPassword, salt] = hashPassword(adminPass)
const admin = {
  roles: 'Admin',
  email: adminEmail,
  hashedPassword,
  salt,
  // vv ADMIN PROFILE INFORMATION vv
  rank: 'POTUS',
  firstName: 'John',
  middleName: 'Fitzgerald',
  lastName: 'Kennedy',
  organization: '407 USA',
  officeSymbol: 'OVL',
  dodId: '1234567890',
  // ^^ ADMIN PROFILE INFORMATION ^^
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

    createAirmen()
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
