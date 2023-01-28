import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AirmanForm from 'src/components/Airman/AirmanForm'

export const QUERY = gql`
  query EditAirmanById($id: Int!) {
    airman: airman(id: $id) {
      id
      email
      hashedPassword
      salt
      firstName
      middleName
      lastName
      organization
      dodId
      rank
      officeSymbol
      roles
      resetToken
      resetTokenExpiresAt
      supervisorId
      monitorId
    }
  }
`
const UPDATE_AIRMAN_MUTATION = gql`
  mutation UpdateAirmanMutation($id: Int!, $input: UpdateAirmanInput!) {
    updateAirman(id: $id, input: $input) {
      id
      email
      hashedPassword
      salt
      firstName
      middleName
      lastName
      organization
      dodId
      rank
      officeSymbol
      roles
      resetToken
      resetTokenExpiresAt
      supervisorId
      monitorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ airman }) => {
  const [updateAirman, { loading, error }] = useMutation(
    UPDATE_AIRMAN_MUTATION,
    {
      onCompleted: () => {
        toast.success('Airman updated')
        navigate(routes.airmen())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateAirman({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit {airman?.rank} {airman?.lastName}, {airman?.firstName}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AirmanForm
          airman={airman}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
