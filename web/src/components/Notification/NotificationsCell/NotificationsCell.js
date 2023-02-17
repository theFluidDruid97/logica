import { Link, routes } from '@redwoodjs/router'

import Notifications from 'src/components/Notification/Notifications'

export const QUERY = gql`
  query FindNotifications {
    notifications {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No notifications yet. '}
      <Link to={routes.newNotification()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ notifications, airmen }) => {
  return <Notifications notifications={notifications} airmen={airmen} />
}
