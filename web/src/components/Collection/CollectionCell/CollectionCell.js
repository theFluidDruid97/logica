import Collection from 'src/components/Collection/Collection'

export const QUERY = gql`
  query FindCollectionById($id: Int!) {
    collection: collection(id: $id) {
      id
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Collection not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ collection }) => {
  return <Collection collection={collection} />
}
