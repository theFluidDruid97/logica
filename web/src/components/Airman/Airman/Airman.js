import Button from '@mui/material/Button'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../../App.js'

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
      id
    }
  }
`

const Airman = ({ airman, airmen }) => {
  const supervisor = airmen.find(
    (supervisor) => supervisor.id === airman.supervisorId
  )
  const monitor = airmen.find((monitor) => monitor.id === airman.monitorId)

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
              <th>Rank</th>
              <td>{airman.rank}</td>
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
              <th>Office Symbol</th>
              <td>{airman.officeSymbol}</td>
            </tr>
            <tr>
              <th>DoD ID</th>
              <td>{airman.dodId}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{airman.roles}</td>
            </tr>
            <tr>
              <th>Supervisor</th>
              <td>
                {supervisor
                  ? `${supervisor.rank} ${supervisor.lastName}, ${
                      supervisor.firstName
                    } ${supervisor.middleName.charAt(0)} (${
                      supervisor.organization
                    } ${supervisor.officeSymbol})`
                  : null}
              </td>
            </tr>
            <tr>
              <th>Monitor</th>
              <td>
                {monitor
                  ? `${monitor.rank} ${monitor.lastName}, ${
                      monitor.firstName
                    } ${monitor.middleName.charAt(0)} (${
                      monitor.organization
                    } ${monitor.officeSymbol})`
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={() => navigate(routes.editAirman({ id: airman.id }))}
        >
          Edit
        </Button>
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          color="error"
          onClick={() => onDeleteClick(airman, airman.id)}
        >
          Delete
        </Button>
      </nav>
    </>
  )
}

export default Airman
