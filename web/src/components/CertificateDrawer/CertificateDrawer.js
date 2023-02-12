import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickerInline } from 'filestack-react'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../App.js'

const CREATE_CERTIFICATE_MUTATION = gql`
  mutation CreateCertificateMutation($input: CreateCertificateInput!) {
    createCertificate(input: $input) {
      trainingId
      airmanId
      url
      completion
    }
  }
`

const CertificateDrawer = ({ trainings, airman }) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [training, setTraining] = React.useState()
  const [completion, setCompletion] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [init, setInit] = React.useState(true)
  const [createCertificate] = useMutation(CREATE_CERTIFICATE_MUTATION, {
    onCompleted: () => {
      toast.success(`Certificate submitted`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const handleFileUpload = (response) => {
    onSave({
      airmanId: airman.id,
      trainingId: training.id,
      completion: completion,
      url: response.filesUploaded[0].url,
    })
    toggleDrawer()
  }
  const handleTrainingChange = (event) => {
    setTraining(event.target.value)
  }
  const handleNext = () => {
    if (training) {
      setInit(false)
    } else {
      toast.error('Select training to submit certificate for.')
    }
  }
  const onSave = (input, id) => {
    console.log(input)
    createCertificate({ variables: { id, input } })
  }
  const handleCompletionChange = (newDate) => {
    setCompletion(newDate)
  }
  const toggleDrawer = () => {
    setOpen(!open)
    setInit(true)
    setTraining()
    setCompletion(new Date())
  }

  return (
    <div>
      <Button
        variant={mode === 'light' ? 'contained' : 'outlined'}
        onClick={() => toggleDrawer()}
        size="large"
      >
        Submit Certificate
      </Button>
      <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer()}>
        <FormControl sx={{ marginY: '25%', paddingX: '10%', width: '400px' }}>
          {init ? (
            <Box>
              <Box marginBottom="10%">
                <InputLabel sx={{ paddingX: '13.5%' }} id="training-label">
                  Training to Certify
                </InputLabel>
                <Select
                  fullWidth
                  value={training}
                  onChange={handleTrainingChange}
                  label="Training to Certify"
                  labelId="training-label"
                >
                  {trainings.map((training) => (
                    <MenuItem key={training.id} value={training}>
                      {training.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box marginBottom="10%">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Completion"
                    inputFormat="dd MMM yyyy"
                    value={completion}
                    onChange={handleCompletionChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Button sx={{ width: '100%' }} onClick={() => handleNext()}>
                Next
              </Button>
            </Box>
          ) : (
            <PickerInline
              apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
              onSuccess={handleFileUpload}
            />
          )}
        </FormControl>
      </Drawer>
    </div>
  )
}

export default CertificateDrawer
