import { Link, routes } from '@redwoodjs/router'

import NotificationLists from 'src/components/NotificationList/NotificationLists'

export const QUERY = gql`
  query FindNotificationLists {
    notificationLists {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No notificationLists yet. '}
      <Link to={routes.newNotificationList()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ notificationLists, airmen }) => {
  return (
    <NotificationLists notificationLists={notificationLists} airmen={airmen} />
  )
}
