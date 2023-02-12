export const schema = gql`
  type Airman {
    id: Int!
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
    afsc: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    supervisorId: Int
    supervisor: Airman
    airmen: [Airman]!
    roles: Role!
    assignedTrainings: [AirmanTraining]!
    certificates: [Certificate]!
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
    afsc: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    supervisorId: Int
    roles: Role!
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
    afsc: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    supervisorId: Int
    roles: Role
  }

  type Mutation {
    createAirman(input: CreateAirmanInput!): Airman! @requireAuth
    updateAirman(id: Int!, input: UpdateAirmanInput!): Airman! @requireAuth
    deleteAirman(id: Int!): Airman! @requireAuth
  }
`
