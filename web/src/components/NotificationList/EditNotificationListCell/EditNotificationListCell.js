import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import NotificationListForm from 'src/components/NotificationList/NotificationListForm'

export const QUERY = gql`
  query EditNotificationListById($id: Int!) {
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
const UPDATE_NOTIFICATION_LIST_MUTATION = gql`
  mutation UpdateNotificationListMutation(
    $id: Int!
    $input: UpdateNotificationListInput!
  ) {
    updateNotificationList(id: $id, input: $input) {
      id
      airmanId
      createdAt
      messsage
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ notificationList, airmen }) => {
  const [updateNotificationList, { loading, error }] = useMutation(
    UPDATE_NOTIFICATION_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('NotificationList updated')
        navigate(routes.notificationLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateNotificationList({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit NotificationList {notificationList?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <NotificationListForm
          notificationList={notificationList}
          airmen={airmen}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
