export const schema = gql`
  type Certificate {
    id: Int!
    airman: Airman!
    airmanId: Int!
    training: Training!
    trainingId: Int!
    url: String!
    completion: DateTime!
    validated: Boolean
  }

  type Query {
    certificates: [Certificate!]! @requireAuth
    certificate(id: Int!): Certificate @requireAuth
  }

  input CreateCertificateInput {
    airmanId: Int!
    trainingId: Int!
    url: String!
    completion: DateTime!
    validated: Boolean
  }

  input UpdateCertificateInput {
    airmanId: Int
    trainingId: Int
    url: String
    completion: DateTime
    validated: Boolean
  }

  type Mutation {
    createCertificate(input: CreateCertificateInput!): Certificate! @requireAuth
    updateCertificate(id: Int!, input: UpdateCertificateInput!): Certificate!
      @requireAuth
    deleteCertificate(id: Int!): Certificate! @requireAuth
  }
`
