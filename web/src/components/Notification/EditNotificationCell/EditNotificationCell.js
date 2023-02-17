import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import NotificationForm from 'src/components/Notification/NotificationForm'

export const QUERY = gql`
  query EditNotificationById($id: Int!) {
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
const UPDATE_NOTIFICATION_MUTATION = gql`
  mutation UpdateNotificationMutation(
    $id: Int!
    $input: UpdateNotificationInput!
  ) {
    updateNotification(id: $id, input: $input) {
      id
      airmanId
      message
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ notification, airmen }) => {
  const [updateNotification, { loading, error }] = useMutation(
    UPDATE_NOTIFICATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Notification updated')
        navigate(routes.notifications())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateNotification({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Notification {notification?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <NotificationForm
          notification={notification}
          airmen={airmen}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
