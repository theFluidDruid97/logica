export const schema = gql`
  type Training {
    id: Int!
    name: String!
    description: String
    link: String
    duration: Int
    TrainingCollection: [TrainingCollection]!
    AirmanTraining: [AirmanTraining]!
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
  }

  input UpdateTrainingInput {
    name: String
    description: String
    link: String
    duration: Int
  }

  type Mutation {
    createTraining(input: CreateTrainingInput!): Training! @requireAuth
    updateTraining(id: Int!, input: UpdateTrainingInput!): Training!
      @requireAuth
    deleteTraining(id: Int!): Training! @requireAuth
  }
`
