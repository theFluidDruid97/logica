import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../App.js'

const UPDATE_AIRMAN_MUTATION = gql`
  mutation UpdateAirmanSupervisorMutation(
    $id: Int!
    $input: UpdateAirmanInput!
  ) {
    updateAirman(id: $id, input: $input) {
      id
      supervisorId
    }
  }
`

const SupervisorDrawer = ({ airman, airmen }) => {
  const currentSupervisor = airmen.find(
    (supervisor) => supervisor.id === airman.supervisorId
  )
  const { mode } = React.useContext(ThemeModeContext)
  const [open, setOpen] = React.useState(false)
  const [supervisor, setSupervisor] = React.useState(currentSupervisor)
  const [updateAirman] = useMutation(UPDATE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success(
        `${airman.rank} ${airman.lastName}, ${airman.firstName} Updated`
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const squadronSupervisors = airmen.filter(
    (supervisor) =>
      supervisor.roles === 'Supervisor' &&
      supervisor.organization === airman.organization
  )
  const handleChange = (event) => {
    setSupervisor(event.target.value)
  }
  const handleSubmit = () => {
    if (supervisor === 'none') {
      onSave({ supervisorId: null }, airman.id)
    } else {
      onSave({ supervisorId: supervisor.id }, airman.id)
    }
    toggleDrawer()
  }
  const onSave = (input, id) => {
    updateAirman({ variables: { id, input } })
  }
  const toggleDrawer = () => {
    setOpen(!open)
    setSupervisor(currentSupervisor || 'none')
  }

  return (
    <div>
      <Button
        variant={mode === 'light' ? 'contained' : 'outlined'}
        onClick={() => toggleDrawer()}
      >
        {currentSupervisor ? 'Re-Assign' : 'Assign'}
      </Button>
      <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <FormControl sx={{ marginY: '25%', paddingX: '10%', width: '400px' }}>
          <InputLabel sx={{ paddingX: '13.5%' }} id="supervisor-label">
            Supervisor
          </InputLabel>
          <Select
            value={supervisor}
            onChange={handleChange}
            label="Supervisor"
            labelId="supervisor-label"
          >
            <MenuItem key={null} value={'none'}>
              NO SUPERVISOR
            </MenuItem>
            {squadronSupervisors.map((supervisor) => (
              <MenuItem key={supervisor.id} value={supervisor}>
                {`${supervisor.rank} ${supervisor.lastName}, ${supervisor.firstName} ${supervisor.middleName}`}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </FormControl>
      </Drawer>
    </div>
  )
}

export default SupervisorDrawer
