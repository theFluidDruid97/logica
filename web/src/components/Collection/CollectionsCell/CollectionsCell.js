import { Link, routes } from '@redwoodjs/router'

import Collections from 'src/components/Collection/Collections'

export const QUERY = gql`
  query FindCollections {
    collections {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No collections yet. '}
      <Link to={routes.newCollection()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ collections }) => {
  return <Collections collections={collections} />
}
