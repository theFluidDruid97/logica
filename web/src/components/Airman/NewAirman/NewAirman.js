import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AirmanForm from 'src/components/Airman/AirmanForm'

const CREATE_AIRMAN_MUTATION = gql`
  mutation CreateAirmanMutation($input: CreateAirmanInput!) {
    createAirman(input: $input) {
      id
    }
  }
`

const NewAirman = () => {
  const [createAirman, { loading, error }] = useMutation(
    CREATE_AIRMAN_MUTATION,
    {
      onCompleted: () => {
        toast.success('Airman created')
        navigate(routes.airmen())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createAirman({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Airman</h2>
      </header>
      <div className="rw-segment-main">
        <AirmanForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAirman
