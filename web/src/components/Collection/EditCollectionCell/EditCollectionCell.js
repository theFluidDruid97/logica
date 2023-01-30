import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CollectionForm from 'src/components/Collection/CollectionForm'

import { ThemeModeContext } from '../../../App.js'
export const QUERY = gql`
  query EditCollectionById($id: Int!) {
    collection: collection(id: $id) {
      id
      name
    }
  }
`
const UPDATE_COLLECTION_MUTATION = gql`
  mutation UpdateCollectionMutation($id: Int!, $input: UpdateCollectionInput!) {
    updateCollection(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ collection }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [updateCollection, { loading, error }] = useMutation(
    UPDATE_COLLECTION_MUTATION,
    {
      onCompleted: () => {
        toast.success(`${collection.name} updated`)
        navigate(routes.collections())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCollection({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header
        className={
          mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
        }
      >
        <h2 className="rw-heading rw-heading-secondary">
          Edit {collection?.name} Details
        </h2>
      </header>
      <div
        className={
          mode === 'light' ? 'rw-segment-main' : 'rw-segment-main-dark'
        }
      >
        <CollectionForm
          collection={collection}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
