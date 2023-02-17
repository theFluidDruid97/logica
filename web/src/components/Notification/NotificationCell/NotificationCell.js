import Notification from 'src/components/Notification/Notification'

export const QUERY = gql`
  query FindNotificationById($id: Int!) {
    notification: notification(id: $id) {
      id
      airmanId
      message
      createdAt
    }
    airmen {
      id
      firstName
      lastName
      rank
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Notification not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ notification, airmen }) => {
  return <Notification notification={notification} airmen={airmen} />
}
