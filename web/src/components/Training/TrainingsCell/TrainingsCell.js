import { Link, routes } from '@redwoodjs/router'

import Trainings from 'src/components/Training/Trainings'

export const QUERY = gql`
  query FindTrainings {
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
      {'No trainings yet. '}
      <Link to={routes.newTraining()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  trainings,
  airmanTrainings,
  airmen,
  certificates,
}) => {
  return (
    <Trainings
      trainings={trainings}
      airmanTrainings={airmanTrainings}
      airmen={airmen}
      certificates={certificates}
    />
  )
}
