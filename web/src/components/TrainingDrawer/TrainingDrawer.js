import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
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

const TrainingDrawer = ({ airman, trainings, currentAirmanTrainings }) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [open, setOpen] = React.useState(false)
  const [training, setTraining] = React.useState()
  const [start, setStart] = React.useState()
  const [end, setEnd] = React.useState()
  const [startCheck, setStartCheck] = React.useState(false)
  const [endCheck, setEndCheck] = React.useState(false)
  const [createAirmanTraining] = useMutation(CREATE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success(`${training.name} assigned`)
      toggleDrawer()
      setTraining()
      setStart()
      setEnd()
      setStartCheck(false)
      setEndCheck(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: ['FindAirmanById'],
    awaitRefetchQueries: true,
  })
  const handleSubmit = () => {
    onSave({
      airmanId: airman.id,
      trainingId: training.id,
      start: start,
      end: end,
      approval: true,
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
  const handleStartCheck = () => {
    setStartCheck(!startCheck)
    if (!startCheck) {
      setStart(new Date())
    } else {
      setStart()
    }
  }
  const handleEndCheck = () => {
    setEndCheck(!endCheck)
    if (!endCheck) {
      setEnd(new Date())
    } else {
      setEnd()
    }
  }
  const unassignedTrainings = trainings.filter(
    (training) =>
      training.id !==
      currentAirmanTrainings.find(
        (currentAirmanTraining) =>
          currentAirmanTraining.trainingId === training.id
      )?.trainingId
  )

  return (
    <div>
      <Button
        variant={mode === 'light' ? 'contained' : 'outlined'}
        onClick={() => toggleDrawer()}
        size="large"
      >
        Assign Training
      </Button>
      <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <FormControl sx={{ marginY: '25%', paddingX: '10%', width: '400px' }}>
          <Box marginBottom="10%">
            <InputLabel sx={{ paddingX: '13%' }}>Training</InputLabel>
            <Select
              fullWidth
              value={training}
              onChange={handleTrainingChange}
              label="Training"
            >
              {unassignedTrainings.map((training) => (
                <MenuItem key={training.id} value={training}>
                  {training.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Stack direction="row" marginBottom="10%">
            <Checkbox
              onChange={() => handleStartCheck()}
              checked={startCheck}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={!startCheck}
                label="Start"
                value={start}
                onChange={handleStartChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Stack direction="row" marginBottom="10%">
            <Checkbox onChange={() => handleEndCheck()} checked={endCheck} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={!endCheck}
                label="End"
                value={end}
                onChange={handleEndChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </FormControl>
      </Drawer>
    </div>
  )
}

export default TrainingDrawer
