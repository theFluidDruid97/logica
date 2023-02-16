import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import NotificationListForm from 'src/components/NotificationList/NotificationListForm'

const CREATE_NOTIFICATION_LIST_MUTATION = gql`
  mutation CreateNotificationListMutation(
    $input: CreateNotificationListInput!
  ) {
    createNotificationList(input: $input) {
      id
    }
  }
`

const NewNotificationList = ({}) => {
  const [createNotificationList, { loading, error }] = useMutation(
    CREATE_NOTIFICATION_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('NotificationList created')
        navigate(routes.notificationLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createNotificationList({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New NotificationList
        </h2>
      </header>
      <div className="rw-segment-main">
        <NotificationListForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewNotificationList
