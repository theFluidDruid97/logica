import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TrainingForm from 'src/components/Training/TrainingForm'

import { ThemeModeContext } from '../../../App.js'

export const QUERY = gql`
  query EditTrainingById($id: Int!) {
    training: training(id: $id) {
      id
      name
      duration
      link
      description
      collections
    }
  }
`
const UPDATE_TRAINING_MUTATION = gql`
  mutation UpdateTrainingMutation($id: Int!, $input: UpdateTrainingInput!) {
    updateTraining(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ training }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [updateTraining, { loading, error }] = useMutation(
    UPDATE_TRAINING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Training updated')
        navigate(routes.trainings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateTraining({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header
        className={
          mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
        }
      >
        <h2 className="rw-heading rw-heading-secondary">
          Edit {training?.name} Details
        </h2>
      </header>
      <div
        className={
          mode === 'light' ? 'rw-segment-main' : 'rw-segment-main-dark'
        }
      >
        <TrainingForm
          training={training}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
