export const schema = gql`
  type AirmanTraining {
    id: Int!
    airman: Airman!
    airmanId: Int!
    training: Training!
    trainingId: Int!
    status: Status
    start: DateTime
    end: DateTime
    approval: Boolean!
  }

  enum Status {
    Current
    Due
    Overdue
  }

  type Query {
    airmanTrainings: [AirmanTraining!]! @requireAuth
    airmanTraining(id: Int!): AirmanTraining @requireAuth
  }

  input CreateAirmanTrainingInput {
    airmanId: Int!
    trainingId: Int!
    status: Status
    start: DateTime
    end: DateTime
    approval: Boolean!
  }

  input UpdateAirmanTrainingInput {
    airmanId: Int
    trainingId: Int
    status: Status
    start: DateTime
    end: DateTime
    approval: Boolean
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
