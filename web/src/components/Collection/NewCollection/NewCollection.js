import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CollectionForm from 'src/components/Collection/CollectionForm'

import { ThemeModeContext } from '../../../App.js'

const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollectionMutation($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      id
    }
  }
`

const NewCollection = () => {
  const { mode } = React.useContext(ThemeModeContext)
  const [createCollection, { loading, error }] = useMutation(
    CREATE_COLLECTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Collection created')
        navigate(routes.collections())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCollection({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header
        className={
          mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
        }
      >
        <h2 className="rw-heading rw-heading-secondary">New Collection</h2>
      </header>
      <div
        className={
          mode === 'light' ? 'rw-segment-main' : 'rw-segment-main-dark'
        }
      >
        <CollectionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCollection
