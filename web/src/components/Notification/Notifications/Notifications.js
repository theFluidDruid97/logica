import * as React from 'react'

import { FormControl, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DeleteNotificationMutation($id: Int!) {
    deleteNotification(id: $id) {
      id
    }
  }
`
export const QUERY = gql`
  query FindAirman {
    airmen {
      id
      lastName
      firstName
      rank
    }
  }
`

const NotificationsList = ({ notifications }) => {
  const [open, setOpen] = React.useState(false)

  const { data } = useQuery(QUERY)
  console.log(data.airmen)
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION_MUTATION, {
    onCompleted: () => {
      toast.success('Notification deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete notification ' + id + '?')) {
      deleteNotification({ variables: { id } })
    }
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <div>
        <Button sx={{ marginLeft: 161 }}>
          <Link to={routes.newNotification()}>New Notification</Link>
        </Button>
      </div>

      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            {/* <th>airmanId</th> */}
            <th>Created at</th>
            <th>Message</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>
                {`${
                  data.airmen.find(
                    (airman) => airman.id === notification.airmanId
                  ).rank
                }
                  ${
                    data.airmen.find(
                      (airman) => airman.id === notification.airmanId
                    ).lastName
                  }, ${
                  data.airmen.find(
                    (airman) => airman.id === notification.airmanId
                  ).firstName
                }`}
              </td>
              <td>{timeTag(notification.createdAt)}</td>
              <td>{truncate(notification.message)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Button
                    onClick={() => toggleDrawer()}
                    to={routes.notification({ id: notification.id })}
                    title={'Show notification ' + notification.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Button>
                  <Link
                    to={routes.editNotification({ id: notification.id })}
                    title={'Edit notification ' + notification.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete notification ' + notification.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(notification.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <FormControl
          variant="standard"
          sx={{ marginLeft: '5%', textOverflow: '0' }}
        >
          <Box sx={{ width: 500, marginTop: 10 }} role="presentation">
            <div>
              {notifications.map((notification) => (
                <div key={notification.id}>
                  <p>{truncate(notification.message)}</p>
                </div>
              ))}
            </div>
          </Box>
        </FormControl>
      </Drawer>
    </div>
  )
}

export default NotificationsList
