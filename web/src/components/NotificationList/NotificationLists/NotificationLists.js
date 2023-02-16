import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_NOTIFICATION_LIST_MUTATION = gql`
  mutation DeleteNotificationListMutation($id: Int!) {
    deleteNotificationList(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query FindAirmen {
    airmen {
      id
      lastName
      firstName
      rank
    }
  }
`

const NotificationListsList = ({ notificationLists }) => {
  const { data } = useQuery(QUERY)
  const [deleteNotificationList] = useMutation(
    DELETE_NOTIFICATION_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('NotificationList deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Airman id</th>
            <th>Created at</th>
            <th>Messsage</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {notificationLists.map((notificationList) => (
            <tr key={notificationList.id}>
              <td>{truncate(notificationList.id)}</td>
              <td>
                {`${
                  data.airmen.find(
                    (airman) => airman.id === notificationList.airmanId
                  ).rank
                }
                  ${
                    data.airmen.find(
                      (airman) => airman.id === notificationList.airmanId
                    ).lastName
                  }, ${
                  data.airmen.find(
                    (airman) => airman.id === notificationList.airmanId
                  ).firstName
                }`}
              </td>
              <td>{timeTag(notificationList.createdAt)}</td>
              <td>{truncate(notificationList.messsage)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.notificationList({ id: notificationList.id })}
                    title={
                      'Show notificationList ' + notificationList.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editNotificationList({
                      id: notificationList.id,
                    })}
                    title={'Edit notificationList ' + notificationList.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete notificationList ' + notificationList.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(notificationList.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NotificationListsList
