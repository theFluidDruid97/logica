import Collection from 'src/components/Collection/Collection'

export const QUERY = gql`
  query FindCollectionById($id: Int!) {
    collection: collection(id: $id) {
      id
      name
      description
    }
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
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Collection not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ collection, airmen, trainings }) => {
  return (
    <Collection collection={collection} airmen={airmen} trainings={trainings} />
  )
}
