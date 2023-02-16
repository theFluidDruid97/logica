export const schema = gql`
  type NotificationList {
    id: Int!
    airman: Airman!
    airmanId: Int!
    createdAt: DateTime!
    messsage: String!
  }

  type Query {
    notificationLists: [NotificationList!]! @requireAuth
    notificationList(id: Int!): NotificationList @requireAuth
  }

  input CreateNotificationListInput {
    airmanId: Int!
    messsage: String!
  }

  input UpdateNotificationListInput {
    airmanId: Int
    messsage: String
  }

  type Mutation {
    createNotificationList(
      input: CreateNotificationListInput!
    ): NotificationList! @requireAuth
    updateNotificationList(
      id: Int!
      input: UpdateNotificationListInput!
    ): NotificationList! @requireAuth
    deleteNotificationList(id: Int!): NotificationList! @requireAuth
  }
`
