import Button from '@mui/material/Button'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import { ThemeModeContext } from '../../../App.js'

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
      id
    }
  }
`

const Airman = ({ airman, roles }) => {
  let supervisor = null
  const FoundSupervisor = roles
    .find((role) => role.name === 'leadership')
    .Airman.find((supervisor) => supervisor.id === airman.supervisorId)
  if (FoundSupervisor) {
    supervisor = `${FoundSupervisor.rank} ${FoundSupervisor.lastName}, ${FoundSupervisor.firstName}`
  }

  let monitor = null
  const FoundMonitor = roles
    .find((role) => role.name === 'monitor')
    .Airman.find((monitor) => monitor.id === airman.monitorId)
  if (FoundMonitor) {
    monitor = `${FoundMonitor.rank} ${FoundMonitor.lastName}, ${FoundMonitor.firstName}`
  }

  const { mode, setMode } = React.useContext(ThemeModeContext)

  const [deleteAirman] = useMutation(DELETE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success('Airman deleted')
      navigate(routes.airmen())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (airman, id) => {
    if (
      confirm(
        `Are you sure you want to delete ${airman.rank} ${airman.lastName}, ${airman.firstName}?`
      )
    ) {
      deleteAirman({ variables: { id } })
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
            {airman.rank} {airman.lastName}, {airman.firstName}
          </h2>
        </header>
        <table className={mode === 'light' ? 'rw-table' : 'rw-table-dark'}>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{airman.id}</td>
            </tr>
            <tr>
              <th>E-Mail</th>
              <td>{airman.email}</td>
            </tr>
            <tr>
              <th>Hashed Password</th>
              <td>{airman.hashedPassword}</td>
            </tr>
            <tr>
              <th>Salt</th>
              <td>{airman.salt}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{airman.firstName}</td>
            </tr>
            <tr>
              <th>Middle Name</th>
              <td>{airman.middleName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{airman.lastName}</td>
            </tr>
            <tr>
              <th>Organization</th>
              <td>{airman.organization}</td>
            </tr>
            <tr>
              <th>DoD ID</th>
              <td>{airman.dodId}</td>
            </tr>
            <tr>
              <th>Rank</th>
              <td>{airman.rank}</td>
            </tr>
            <tr>
              <th>Office Symbol</th>
              <td>{airman.officeSymbol}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>
                {airman.roles
                  ? airman.roles.charAt(0).toUpperCase() + airman.roles.slice(1)
                  : null}
              </td>
            </tr>
            <tr>
              <th>Reset Token</th>
              <td>{airman.resetToken}</td>
            </tr>
            <tr>
              <th>Reset Token Expiration</th>
              <td>{timeTag(airman.resetTokenExpiresAt)}</td>
            </tr>
            <tr>
              <th>Supervisor</th>
              <td>{supervisor}</td>
            </tr>
            <tr>
              <th>Monitor</th>
              <td>{monitor}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Button onClick={() => navigate(routes.editAirman({ id: airman.id }))}>
          Edit
        </Button>
        <Button
          color="warning"
          onClick={() => onDeleteClick(airman, airman.id)}
        >
          Delete
        </Button>
      </nav>
    </>
  )
}

export default Airman
