import { Link, routes } from '@redwoodjs/router'

import Airmen from 'src/components/Airman/Airmen'

export const QUERY = gql`
  query FindAirmen {
    airmen {
      id
      email
      rank
      firstName
      middleName
      lastName
      organization
      officeSymbol
      dodId
      afsc
      status
      roles
      supervisorId
    }
    trainings {
      id
      name
      duration
      link
      description
    }
    airmanTrainings {
      id
      trainingId
      airmanId
      status
      start
      end
    }
    certificates {
      id
      airmanId
      trainingId
      completion
      validated
      url
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

export const Success = ({
  airmen,
  trainings,
  airmanTrainings,
  certificates,
}) => {
  return (
    <Airmen
      airmen={airmen}
      trainings={trainings}
      airmanTrainings={airmanTrainings}
      certificates={certificates}
    />
  )
}
