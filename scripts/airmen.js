import { faker } from '@faker-js/faker'

export const airmen = []

export const ranks = [
  'Amn',
  'A1C',
  'SrA',
  'SSgt',
  'TSgt',
  'MSgt',
  'SMSgt',
  'CMSgt',
  '2Lt',
  '1Lt',
  'Cpt',
  'Maj',
  'LtCol',
  'Col',
]

export const organizations = [
  '2 AMXS',
  '8 FS',
  '67 SOS',
  '96 BS',
  '343 BS',
  '377 SFS',
  '701 MUNSS',
]

const afscs = ['3P0X1', '1T0X1', '2F0X1', '4Y0X1', '5J0X1']

const repeat = (func, times) => {
  func()
  times && --times && repeat(func, times)
}
const createRandomAirman = () => {
  const sex = faker.name.sexType()
  const firstName = faker.name.firstName(sex)
  const middleName = faker.name.middleName(sex)
  const lastName = faker.name.lastName()
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@us.af.mil`
  const organization = faker.helpers.arrayElement(organizations)
  const officeSymbol =
    organization.split(' ')[1].charAt(0) +
    faker.random.numeric(1, {
      bannedDigits: [...'2567890'],
    }) +
    faker.random.alpha({
      count: 1,
      casing: 'upper',
      bannedChars: [...'efghijklmnopqrstuvwxyz'.toUpperCase()],
    })

  airmen.push({
    email,
    firstName,
    middleName,
    lastName,
    officeSymbol,
    organization,
    rank: faker.helpers.arrayElement(ranks),
    afsc: faker.helpers.arrayElement(afscs),
    dodId: faker.random.numeric(10, {
      allowLeadingZeros: false,
    }),
  })
}

repeat(createRandomAirman, 100)
