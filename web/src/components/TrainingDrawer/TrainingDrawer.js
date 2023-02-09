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

const TrainingDrawer = ({ airman, trainings }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [open, setOpen] = React.useState(false)
  const [training, setTraining] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [start, setStart] = React.useState(new Date())
  const [end, setEnd] = React.useState(new Date())
  const [createAirmanTraining, { loading, error }] = useMutation(
    CREATE_AIRMAN_TRAINING_MUTATION,
    {
      onCompleted: () => {
        toast.success(`${training.name} assigned`)
        toggleDrawer()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const handleSubmit = (trainingId) => {
    onSave({
      airmanId: airman.id,
      trainingId: trainingId,
      start: start,
      end: end,
      status: status,
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
  const handleStartChange = (newDate) => {
    setStart(newDate)
  }
  const handleEndChange = (newDate) => {
    setEnd(newDate)
  }
  const handleStatusChange = (event) => {
    setStatus(event.target.value)
  }

  return (
    <div>
      <Button
        sx={{ marginX: '1%', width: '100%' }}
        variant={mode === 'light' ? 'contained' : 'outlined'}
        onClick={() => toggleDrawer()}
        size="large"
      >
        Assign Training
      </Button>
      <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <Box sx={{ width: 400, marginTop: 10 }} role="presentation">
          <FormControl
            variant="standard"
            sx={{ marginTop: '20%', marginLeft: '20%' }}
          >
            <Box marginY="10%">
              <InputLabel>Training</InputLabel>
              <Select
                fullWidth
                value={training}
                onChange={handleTrainingChange}
                label="Training"
              >
                {trainings.map((training) => (
                  <MenuItem key={training.id} value={training}>
                    {training.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box marginY="10%">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start"
                  value={start}
                  onChange={handleStartChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box marginY="10%">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="End"
                  value={end}
                  onChange={handleEndChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box marginY="10%">
              <Select
                fullWidth
                value={status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value={'current'}>Current</MenuItem>
                <MenuItem value={'due'}>Due</MenuItem>
                <MenuItem value={'over_due'}>Over Due</MenuItem>
              </Select>
            </Box>
            <Button onClick={() => handleSubmit(training.id)}>Submit</Button>
          </FormControl>
        </Box>
      </Drawer>
    </div>
  )
}

export default TrainingDrawer
