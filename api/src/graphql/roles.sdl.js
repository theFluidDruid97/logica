export const schema = gql`
  type Role {
    id: Int!
    name: String!
    description: String
    airman: Airman
    airmanId: Int
  }

  type Query {
    roles: [Role!]! @requireAuth
    role(id: Int!): Role @requireAuth
  }

  input CreateRoleInput {
    name: String!
    description: String
    airmanId: Int
  }

  input UpdateRoleInput {
    name: String
    description: String
    airmanId: Int
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Role! @requireAuth
    updateRole(id: Int!, input: UpdateRoleInput!): Role! @requireAuth
    deleteRole(id: Int!): Role! @requireAuth
  }
`
