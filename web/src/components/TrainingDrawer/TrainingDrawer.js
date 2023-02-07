import Box from '@mui/material/Box'
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
  mutation UpdateAirmanMutation($id: Int!, $input: UpdateAirmanInput!) {
    updateAirman(id: $id, input: $input) {
      id
      supervisorId
    }
  }
`

const TrainingDrawer = ({ airman }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [open, setOpen] = React.useState(false)
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
  // const handleChange = (event) => {
  //   setSupervisor(event.target.value)
  // }
  // const handleSubmit = () => {
  //   onSave({ supervisorId: supervisor.id }, airman.id)
  //   toggleDrawer()
  // }
  // const onSave = (input, id) => {
  //   updateAirman({ variables: { id, input } })
  // }
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <div>
      <Button
        sx={{ marginX: '1%' }}
        variant={mode === 'light' ? 'contained' : 'outlined'}
        size="large"
      >
        Assign Training
      </Button>
      <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <Box sx={{ width: 400, marginTop: 10 }} role="presentation">
          <FormControl variant="standard" sx={{ m: 7, width: 300 }}>
            <InputLabel>Supervisor</InputLabel>
            <Select
              value={null}
              // onChange={handleChange}
              label="Supervisor"
            >
              {/* {squadronSupervisors.map((supervisor) => (
                <MenuItem key={supervisor.id} value={supervisor}>
                  {`${supervisor.rank} ${supervisor.lastName}, ${supervisor.firstName} ${supervisor.middleName}`}
                </MenuItem>
              ))} */}
            </Select>
            <Button>Submit</Button>
          </FormControl>
        </Box>
      </Drawer>
    </div>
  )
}

export default TrainingDrawer
