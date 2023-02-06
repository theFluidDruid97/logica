export const schema = gql`
  type TrainingCollection {
    id: Int!
    training: Training!
    trainingId: Int!
    collection: Collection!
    collectionId: Int!
  }

  type Query {
    trainingCollections: [TrainingCollection!]! @requireAuth
    trainingCollection(id: Int!): TrainingCollection @requireAuth
  }

  input CreateTrainingCollectionInput {
    trainingId: Int!
    collectionId: Int!
  }

  input UpdateTrainingCollectionInput {
    trainingId: Int
    collectionId: Int
  }

  type Mutation {
    createTrainingCollection(
      input: CreateTrainingCollectionInput!
    ): TrainingCollection! @requireAuth
    updateTrainingCollection(
      id: Int!
      input: UpdateTrainingCollectionInput!
    ): TrainingCollection! @requireAuth
    deleteTrainingCollection(id: Int!): TrainingCollection! @requireAuth
  }
`
