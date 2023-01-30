export const schema = gql`
  type Airman {
    id: Int!
    email: String!
    hashedPassword: String!
    salt: String!
    firstName: String
    middleName: String
    lastName: String
    organization: String
    dodId: String
    rank: String
    officeSymbol: String
    roleObj: Role
    roles: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    supervisorId: Int
    monitorId: Int
  }

  type Query {
    airmen: [Airman!]! @requireAuth
    airman(id: Int!): Airman @requireAuth
  }

  input CreateAirmanInput {
    email: String!
    hashedPassword: String!
    salt: String!
    firstName: String
    middleName: String
    lastName: String
    organization: String
    dodId: String
    rank: String
    officeSymbol: String
    roles: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    supervisorId: Int
    monitorId: Int
  }

  input UpdateAirmanInput {
    email: String
    hashedPassword: String
    salt: String
    firstName: String
    middleName: String
    lastName: String
    organization: String
    dodId: String
    rank: String
    officeSymbol: String
    roles: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    supervisorId: Int
    monitorId: Int
  }

  type Mutation {
    createAirman(input: CreateAirmanInput!): Airman! @requireAuth
    updateAirman(id: Int!, input: UpdateAirmanInput!): Airman! @requireAuth
    deleteAirman(id: Int!): Airman! @requireAuth
  }
`
