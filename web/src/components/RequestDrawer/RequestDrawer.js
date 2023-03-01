import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

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

const RequestDrawer = ({ airman, trainings }) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [open, setOpen] = React.useState(false)
  const [training, setTraining] = React.useState()
  const [createAirmanTraining] = useMutation(CREATE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success(`${training.name} requested`)
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
      approval: false,
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
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </FormControl>
      </Drawer>
    </div>
  )
}

export default RequestDrawer
