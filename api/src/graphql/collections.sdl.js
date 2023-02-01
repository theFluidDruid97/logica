export const schema = gql`
  type Collection {
    id: Int!
    name: String!
    description: String
    training: Training
    trainingId: Int
  }

  type Query {
    collections: [Collection!]! @requireAuth
    collection(id: Int!): Collection @requireAuth
  }

  input CreateCollectionInput {
    name: String!
    description: String
    trainingId: Int
  }

  input UpdateCollectionInput {
    name: String
    description: String
    trainingId: Int
  }

  type Mutation {
    createCollection(input: CreateCollectionInput!): Collection! @requireAuth
    updateCollection(id: Int!, input: UpdateCollectionInput!): Collection!
      @requireAuth
    deleteCollection(id: Int!): Collection! @requireAuth
  }
`
