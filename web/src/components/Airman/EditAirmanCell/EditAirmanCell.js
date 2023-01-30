import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AirmanForm from 'src/components/Airman/AirmanForm'

import { ThemeModeContext } from '../../../App.js'

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
    roles {
      id
      name
      Airman {
        id
        rank
        lastName
        firstName
      }
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

export const Success = ({ airman, roles }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [updateAirman, { loading, error }] = useMutation(
    UPDATE_AIRMAN_MUTATION,
    {
      onCompleted: () => {
        toast.success(
          `${airman.rank} ${airman.lastName}, ${airman.firstName} Updated`
        )
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
      <header
        className={
          mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
        }
      >
        <h2 className="rw-heading rw-heading-secondary">
          Edit {airman?.rank} {airman?.lastName}, {airman?.firstName} Details
        </h2>
      </header>
      <div
        className={
          mode === 'light' ? 'rw-segment-main' : 'rw-segment-main-dark'
        }
      >
        <AirmanForm
          airman={airman}
          roles={roles}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
