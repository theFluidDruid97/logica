import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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
const not = (array, exclude) => {
  return array.filter((value) => exclude.indexOf(value) === -1)
}
const intersection = (array, include) => {
  return array.filter((value) => include.indexOf(value) !== -1)
}

const AirmanDrawer = ({
  training,
  assignedAirmen,
  airmen,
  trainings,
  displayButton,
  drawerOpen,
  setDrawerOpen,
}) => {
  let mutationCount = 0
  let unassignedAirmen
  if (training) {
    unassignedAirmen = airmen.filter(
      (airman) =>
        airman !==
        assignedAirmen.find((assignedAirman) => airman === assignedAirman)
    )
  } else {
    unassignedAirmen = airmen
  }
  const { mode } = React.useContext(ThemeModeContext)
  const [checked, setChecked] = React.useState([])
  const [start, setStart] = React.useState()
  const [end, setEnd] = React.useState()
  const [startCheck, setStartCheck] = React.useState(false)
  const [endCheck, setEndCheck] = React.useState(false)
  const [scheduleDrawerOpen, setScheduleDrawerOpen] = React.useState(false)
  const [filter, setFilter] = React.useState('')
  const [schedule, setSchedule] = React.useState(false)
  const [bottom, setBottom] = React.useState([])
  const [top, setTop] = React.useState(unassignedAirmen)
  const [createAirmanTraining] = useMutation(CREATE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      ++mutationCount
      if (mutationCount + 1 === bottom.length || bottom.length === 1) {
        training
          ? toast.success(`${training.name} assigned to the selected Airmen.`)
          : toast.success(
              `${trainings.length} trainings assigned to the selected Airmen.`
            )
        setFilter('')
        setTop(unassignedAirmen)
        setBottom([])
        setSchedule(false)
        setScheduleDrawerOpen(false)
        setDrawerOpen(false)
      }
    },
    onError: (error) => {
      ++mutationCount
      if (mutationCount + 1 === bottom.length || bottom.length === 1) {
        toast.error(
          `${error.message}\n\n\tThis is likely due to at least one of the selected trainings being already assigned to at least one of the selected Airman.\n\n\tMultiple instances of the same training assigned to the same Airman at any time is unauthorized.`,
          { duration: 10000 }
        )
        setFilter('')
        setTop(unassignedAirmen)
        setBottom([])
        setSchedule(false)
        setScheduleDrawerOpen(false)
        setDrawerOpen(false)
      }
    },
    refetchQueries: training ? ['FindTrainingById'] : ['FindTrainings'],
    awaitRefetchQueries: true,
  })
  const onSave = (input) => {
    createAirmanTraining({ variables: { input } })
  }
  const handleAllBottom = () => {
    setBottom(bottom.concat(filteredTop))
    setTop(not(top, filteredTop))
  }
  const handleCheckedBottom = () => {
    setBottom(bottom.concat(topChecked))
    setTop(not(top, topChecked))
    setChecked(not(checked, topChecked))
  }
  const handleCheckedTop = () => {
    setTop(top.concat(bottomChecked))
    setBottom(not(bottom, bottomChecked))
    setChecked(not(checked, bottomChecked))
  }
  const handleAllTop = () => {
    setTop(top.concat(bottom))
    setBottom([])
  }
  const handleToggleDrawer = () => {
    setFilter('')
    setTop(unassignedAirmen)
    setBottom([])
    setSchedule(false)
    setDrawerOpen(!drawerOpen)
    setScheduleDrawerOpen(false)
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
  const handleSubmit = () => {
    if (bottom.length < 1) {
      toast.error(
        'At least one Airman must be in the "TO BE ASSIGNED" table in order to assign trainings.'
      )
    } else {
      if (schedule) {
        setScheduleDrawerOpen(true)
        setSchedule(false)
      } else {
        if (training) {
          bottom.forEach((airman) =>
            onSave({
              airmanId: airman.id,
              trainingId: training.id,
              start: start,
              end: end,
            })
          )
        } else {
          for (let training of trainings) {
            bottom.forEach((airman) =>
              onSave({
                airmanId: airman.id,
                trainingId: training.id,
                start: start,
                end: end,
              })
            )
          }
        }
      }
    }
  }
  const handleToggleTransferList = (id) => () => {
    const currentIndex = checked.indexOf(id)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(id)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }
  const airmenList = (airmen) => (
    <List dense role="list">
      {airmen.map((airman) => {
        return (
          <ListItem
            key={airman.id}
            role="listitem"
            button
            onClick={handleToggleTransferList(airman)}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(airman) !== -1}
                tabIndex={-1}
              />
            </ListItemIcon>
            <ListItemText
              id={airman.id}
              primary={`${airman.rank} ${airman.lastName}, ${airman.firstName}`}
            />
          </ListItem>
        )
      })}
    </List>
  )
  const filteredTop = top.filter(
    (airman) =>
      airman.rank.toLowerCase().includes(filter.toLowerCase()) ||
      airman.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      airman.firstName.toLowerCase().includes(filter.toLowerCase())
  )
  const topChecked = intersection(checked, top)
  const bottomChecked = intersection(checked, bottom)
  let cardBackground
  if (mode === 'light') {
    cardBackground = 'rgba(155, 155, 155, 0.1)'
  } else {
    cardBackground = 'rgba(0, 0, 0, 0.1)'
  }

  return (
    <>
      {displayButton === undefined ? (
        <Button
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={() => handleToggleDrawer()}
          size="large"
        >
          Assign Airmen
        </Button>
      ) : (
        <></>
      )}

      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => handleToggleDrawer()}
      >
        <FormControl
          sx={{
            marginTop: '25%',
            paddingX: '10%',
            width: '400px',
            height: '89vh',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            fullWidth
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Card
            sx={{
              width: '350px',
              height: '40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '20px',
              background: `${cardBackground}`,
              marginY: '5%',
            }}
          >
            <Typography variant="h5" sx={{ marginY: '5%' }}>
              NOT ASSIGNED
            </Typography>
            <CardContent sx={{ height: '80%', overflowY: 'auto' }}>
              {airmenList(filteredTop)}
            </CardContent>
          </Card>
          <Stack direction="row" alignItems="center">
            <Button
              sx={{ mx: 1 }}
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={handleAllBottom}
              disabled={top.length === 0}
            >
              <KeyboardDoubleArrowDownIcon />
            </Button>
            <Button
              sx={{ mx: 1 }}
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={handleCheckedBottom}
              disabled={topChecked.length === 0}
            >
              <KeyboardArrowDownIcon />
            </Button>
            <Button
              sx={{ mx: 1 }}
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={handleCheckedTop}
              disabled={bottomChecked.length === 0}
            >
              <KeyboardArrowUpIcon />
            </Button>
            <Button
              sx={{ mx: 1 }}
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={handleAllTop}
              disabled={bottom.length === 0}
            >
              <KeyboardDoubleArrowUpIcon />
            </Button>
          </Stack>
          <Card
            sx={{
              width: '350px',
              height: '40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '5%',
              borderRadius: '20px',
              background: `${cardBackground}`,
            }}
          >
            <Typography variant="h5" sx={{ marginY: '5%' }}>
              TO BE ASSIGNED
            </Typography>
            <CardContent sx={{ height: '80%', overflowY: 'auto' }}>
              {airmenList(bottom)}
            </CardContent>
          </Card>
          <FormControlLabel
            sx={{ marginY: '5%' }}
            control={
              <Checkbox
                onChange={() => setSchedule(!schedule)}
                checked={schedule}
              />
            }
            label="Schedule all Airmen now"
          />
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </FormControl>
      </Drawer>
      <Drawer
        anchor={'right'}
        open={scheduleDrawerOpen}
        onClose={() => setScheduleDrawerOpen(!scheduleDrawerOpen)}
      >
        <FormControl
          sx={{
            marginTop: '25%',
            paddingX: '5%',
            width: '400px',
            height: '89vh',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row">
            <Checkbox
              onChange={() => handleStartCheck()}
              checked={startCheck}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={!startCheck}
                label="Start"
                value={start}
                onChange={(newValue) => setStart(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Stack direction="row" marginY="10%">
            <Checkbox onChange={() => handleEndCheck()} checked={endCheck} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled={!endCheck}
                label="End"
                value={end}
                onChange={(newValue) => setEnd(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </FormControl>
      </Drawer>
    </>
  )
}

export default AirmanDrawer
