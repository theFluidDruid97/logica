export const schema = gql`
  type Training {
    id: Int!
    name: String!
    description: String
    link: String
    duration: Int
    createdAt: DateTime
    createdBy: String
    deletedAt: DateTime
    deletedBy: String
    editedAt: DateTime
    editedBy: String
    collections: [TrainingCollection]!
    assignedAirmen: [AirmanTraining]!
    certificates: [Certificate]!
  }

  type Query {
    trainings: [Training!]! @requireAuth
    training(id: Int!): Training @requireAuth
  }

  input CreateTrainingInput {
    name: String!
    description: String
    link: String
    duration: Int
    createdBy: String
    deletedAt: DateTime
    deletedBy: String
    editedAt: DateTime
    editedBy: String
  }

  input UpdateTrainingInput {
    name: String
    description: String
    link: String
    duration: Int
    createdBy: String
    deletedAt: DateTime
    deletedBy: String
    editedAt: DateTime
    editedBy: String
  }

  type Mutation {
    createTraining(input: CreateTrainingInput!): Training! @requireAuth
    updateTraining(id: Int!, input: UpdateTrainingInput!): Training!
      @requireAuth
    deleteTraining(id: Int!): Training! @requireAuth
  }
`
