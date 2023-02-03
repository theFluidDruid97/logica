export const schema = gql`
  type Airman {
    id: Int!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    hashedPassword: String!
    salt: String!
    rank: String
    firstName: String
    middleName: String
    lastName: String
    organization: String
    officeSymbol: String
    dodId: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: Role!
    monitorId: Int
    supervisorId: Int
  }

  enum Role {
    Airman
    Admin
    Monitor
    Supervisor
  }

  type Query {
    airmen: [Airman!]! @requireAuth
    airman(id: Int!): Airman @requireAuth
  }

  input CreateAirmanInput {
    email: String!
    hashedPassword: String!
    salt: String!
    rank: String
    firstName: String
    middleName: String
    lastName: String
    organization: String
    officeSymbol: String
    dodId: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: Role!
    monitorId: Int
    supervisorId: Int
  }

  input UpdateAirmanInput {
    email: String
    hashedPassword: String
    salt: String
    rank: String
    firstName: String
    middleName: String
    lastName: String
    organization: String
    officeSymbol: String
    dodId: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: Role
    monitorId: Int
    supervisorId: Int
  }

  type Mutation {
    createAirman(input: CreateAirmanInput!): Airman! @requireAuth
    updateAirman(id: Int!, input: UpdateAirmanInput!): Airman! @requireAuth
    deleteAirman(id: Int!): Airman! @requireAuth
  }
`
