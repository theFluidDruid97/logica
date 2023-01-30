import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TrainingForm from 'src/components/Training/TrainingForm'

import { ThemeModeContext } from '../../../App.js'

const CREATE_TRAINING_MUTATION = gql`
  mutation CreateTrainingMutation($input: CreateTrainingInput!) {
    createTraining(input: $input) {
      id
    }
  }
`

const NewTraining = () => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [createTraining, { loading, error }] = useMutation(
    CREATE_TRAINING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Training created')
        navigate(routes.trainings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createTraining({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header
        className={
          mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
        }
      >
        <h2 className="rw-heading rw-heading-secondary">New Training</h2>
      </header>
      <div
        className={
          mode === 'light' ? 'rw-segment-main' : 'rw-segment-main-dark'
        }
      >
        <TrainingForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTraining
