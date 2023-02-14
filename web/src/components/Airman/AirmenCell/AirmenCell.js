import { Link, routes } from '@redwoodjs/router'

import Airmen from 'src/components/Airman/Airmen'

export const QUERY = gql`
  query FindAirmen {
    airmen {
      id
      email
      hashedPassword
      salt
      rank
      firstName
      middleName
      lastName
      organization
      officeSymbol
      dodId
      roles
      afsc
      status
      supervisorId
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No airmen yet. '}
      <Link to={routes.newAirman()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ airmen }) => {
  return <Airmen airmen={airmen} />
}
