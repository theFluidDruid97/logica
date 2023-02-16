import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_NOTIFICATION_LIST_MUTATION = gql`
  mutation DeleteNotificationListMutation($id: Int!) {
    deleteNotificationList(id: $id) {
      id
    }
  }
`

const NotificationList = ({ notificationList }) => {
  const [deleteNotificationList] = useMutation(
    DELETE_NOTIFICATION_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('NotificationList deleted')
        navigate(routes.notificationLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete notificationList ' + id + '?')
    ) {
      deleteNotificationList({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            NotificationList {notificationList.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{notificationList.id}</td>
            </tr>
            <tr>
              <th>Airman id</th>
              <td>{notificationList.airmanId}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(notificationList.createdAt)}</td>
            </tr>
            <tr>
              <th>Messsage</th>
              <td>{notificationList.messsage}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editNotificationList({ id: notificationList.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(notificationList.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default NotificationList
