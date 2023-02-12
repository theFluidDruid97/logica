export const schema = gql`
  type Collection {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime
    createdBy: String
    deletedAt: DateTime
    deletedBy: String
    editedAt: DateTime
    editedBy: String
    trainings: [TrainingCollection]!
  }

  type Query {
    collections: [Collection!]! @requireAuth
    collection(id: Int!): Collection @requireAuth
  }

  input CreateCollectionInput {
    name: String!
    description: String
    createdBy: String
    deletedAt: DateTime
    deletedBy: String
    editedAt: DateTime
    editedBy: String
  }

  input UpdateCollectionInput {
    name: String
    description: String
    createdBy: String
    deletedAt: DateTime
    deletedBy: String
    editedAt: DateTime
    editedBy: String
  }

  type Mutation {
    createCollection(input: CreateCollectionInput!): Collection! @requireAuth
    updateCollection(id: Int!, input: UpdateCollectionInput!): Collection!
      @requireAuth
    deleteCollection(id: Int!): Collection! @requireAuth
  }
`
