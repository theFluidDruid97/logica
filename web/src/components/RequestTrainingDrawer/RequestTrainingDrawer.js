import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { organizations } from '../../../../scripts/airmen'
import { ThemeModeContext } from '../../App.js'

const CREATE_AIRMAN_TRAINING_MUTATION = gql`
  mutation CreateAirmanTrainingMutation($input: CreateAirmanTrainingInput!) {
    createAirmanTraining(input: $input) {
      airman {
        id
      }
      training {
        id
      }
    }
  }
`

const RequestTrainingDrawer = ({ airman, trainings }) => {
  const [send, setSend] = React.useState()
  const { mode } = React.useContext(ThemeModeContext)
  const [open, setOpen] = React.useState(false)
  const [training, setTraining] = React.useState()
  const [start, setStart] = React.useState(new Date())
  const [end, setEnd] = React.useState(new Date())
  const [organization, setOrganization] = React.useState('')
  const handleOrganizationChange = (event) => {
    setOrganization(event.target.value)
  }
  const [createAirmanTraining] = useMutation(CREATE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success(`${training.name} assigned`)
      toggleDrawer()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const handleSubmit = () => {
    onSave({
      airmanId: airman.id,
      trainingId: training.id,
      start: start,
      end: end,
      status: 'Pending',
    })
  }
  const onSave = (input, id) => {
    createAirmanTraining({ variables: { id, input } })
  }
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const handleTrainingChange = (event) => {
    setTraining(event.target.value)
  }
  // const handleStartChange = (newDate) => {
  //   setStart(newDate)
  // }
  // const handleEndChange = (newDate) => {
  //   setEnd(newDate)
  // }
  const handleSendChange = (event) => {
    setSend(event)
  }

  return (
    <div>
      <Button
        variant={mode === 'light' ? 'contained' : 'outlined'}
        onClick={() => toggleDrawer()}
        size="large"
      >
        Request Training
      </Button>
      <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <FormControl sx={{ marginY: '25%', paddingX: '10%', width: '400px' }}>
          <Box marginBottom="10%">
            <InputLabel sx={{ paddingX: '13.5%' }} id="training-label">
              Training
            </InputLabel>
            <Select
              fullWidth
              value={training}
              onChange={handleTrainingChange}
              label="Training"
              labelId="training-label"
            >
              {trainings.map((training) => (
                <MenuItem key={training.id} value={training}>
                  {training.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ width: 400, marginTop: 10 }} role="presentation">
            <Box marginY="10%">
              <Box marginY="10%">
                <p>Filters</p>
                <TextField
                  fullWidth
                  select
                  value={organization}
                  label="Organization"
                  onChange={handleOrganizationChange}
                >
                  {organizations.map((organization, index) => (
                    <MenuItem key={organizations[index]} value={organization}>
                      {organizations[index]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Box>
          <Button onClick={() => handleSubmit()} onChange={handleSendChange}>
            Submit
          </Button>
        </FormControl>
      </Drawer>
    </div>
  )
}

export default RequestTrainingDrawer
