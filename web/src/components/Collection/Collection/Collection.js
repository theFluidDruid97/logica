import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'
import { ThemeModeContext } from '../../../App.js'

const DELETE_COLLECTION_MUTATION = gql`
  mutation DeleteCollectionMutation($id: Int!) {
    deleteCollection(id: $id) {
      id
    }
  }
`

const Collection = ({ collection }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [deleteCollection] = useMutation(DELETE_COLLECTION_MUTATION, {
    onCompleted: () => {
      toast.success('Collection deleted')
      navigate(routes.collections())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm(`Are you sure you want to delete ${collection}.name?`)) {
      deleteCollection({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header
          className={
            mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
          }
        >
          <h2 className="rw-heading rw-heading-secondary">
            {collection.name} Details
          </h2>
        </header>
        <Box display="flex" flexDirection="row">
          <table className={mode === 'light' ? 'rw-table' : 'rw-table-dark'}>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{collection.id}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{collection.name}</td>
              </tr>
            </tbody>
          </table>
        </Box>
        <table className={mode === 'light' ? 'rw-table' : 'rw-table-dark'}>
          <thead>
            <th>Trainings</th>
            <th></th>
          </thead>
          {/* <tbody>
            {collection.Training.map((training) => (
              <tr key={training.id}>
                <td>{training.name}</td>
                <td>
                  <Button
                    onClick={() =>
                      navigate(routes.training({ id: training.id }))
                    }
                  >
                    View
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => onRemoveClick(training, training.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      <nav className="rw-button-group">
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={() => navigate(routes.editCollection({ id: collection.id }))}
        >
          Edit
        </Button>
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          color="error"
          onClick={() => onDeleteClick(collection.id)}
        >
          Delete
        </Button>
      </nav>
    </>
  )
}

export default Collection
