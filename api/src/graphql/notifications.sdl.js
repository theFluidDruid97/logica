export const schema = gql`
  type Notification {
    id: Int!
    airmanId: Int!
    airman: Airman!
    message: String!
    createdAt: DateTime!
  }

  type Query {
    notifications: [Notification!]! @requireAuth
    notification(id: Int!): Notification @requireAuth
  }

  input CreateNotificationInput {
    airmanId: Int!
    message: String!
  }

  input UpdateNotificationInput {
    airmanId: Int
    message: String
  }

  type Mutation {
    createNotification(input: CreateNotificationInput!): Notification!
      @requireAuth
    updateNotification(
      id: Int!
      input: UpdateNotificationInput!
    ): Notification! @requireAuth
    deleteNotification(id: Int!): Notification! @requireAuth
  }
`
