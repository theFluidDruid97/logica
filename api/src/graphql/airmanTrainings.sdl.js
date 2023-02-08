export const schema = gql`
  type AirmanTraining {
    id: Int!
    airman: Airman!
    airmanId: Int!
    training: Training!
    trainingId: Int!
  }

  type Query {
    airmanTrainings: [AirmanTraining!]! @requireAuth
    airmanTraining(id: Int!): AirmanTraining @requireAuth
  }

  input CreateAirmanTrainingInput {
    airmanId: Int!
    trainingId: Int!
  }

  input UpdateAirmanTrainingInput {
    airmanId: Int
    trainingId: Int
  }

  type Mutation {
    createAirmanTraining(input: CreateAirmanTrainingInput!): AirmanTraining!
      @requireAuth
    updateAirmanTraining(
      id: Int!
      input: UpdateAirmanTrainingInput!
    ): AirmanTraining! @requireAuth
    deleteAirmanTraining(id: Int!): AirmanTraining! @requireAuth
  }
`
