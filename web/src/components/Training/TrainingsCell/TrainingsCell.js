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
      collections
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

export const Success = ({ trainings }) => {
  return <Trainings trainings={trainings} />
}
