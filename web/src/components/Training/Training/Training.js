import Button from '@mui/material/Button'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'
import { ThemeModeContext } from '../../../App.js'

const DELETE_TRAINING_MUTATION = gql`
  mutation DeleteTrainingMutation($id: Int!) {
    deleteTraining(id: $id) {
      id
    }
  }
`

const Training = ({ training }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [deleteTraining] = useMutation(DELETE_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success('Training deleted')
      navigate(routes.trainings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (training, id) => {
    if (confirm(`Are you sure you want to delete ${training.name}?`)) {
      deleteTraining({ variables: { id } })
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
            {training.name} Details
          </h2>
        </header>
        <table className={mode === 'light' ? 'rw-table' : 'rw-table-dark'}>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{training.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{training.name}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{training.duration}</td>
            </tr>
            <tr>
              <th>Link</th>
              <td>
                <a
                  href={training.link}
                  target="_blank"
                  rel="noreferrer"
                  title={training.link}
                >
                  {training.link}
                </a>
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{training.description}</td>
            </tr>
            <tr>
              <th>Collections</th>
              <td>{training.collections}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={() => navigate(routes.editTraining({ id: training.id }))}
        >
          Edit
        </Button>
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          color="error"
          onClick={() => onDeleteClick(training, training.id)}
        >
          Delete
        </Button>
      </nav>
    </>
  )
}

export default Training
