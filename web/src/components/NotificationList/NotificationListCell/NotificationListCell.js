import NotificationList from 'src/components/NotificationList/NotificationList'

export const QUERY = gql`
  query FindNotificationListById($id: Int!) {
    notificationList: notificationList(id: $id) {
      id
      airmanId
      createdAt
      messsage
    }
    airmen {
      id
      lastName
      firstName
      rank
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>NotificationList not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ notificationList, airmen }) => {
  return (
    <NotificationList notificationList={notificationList} airmen={airmen} />
  )
}
