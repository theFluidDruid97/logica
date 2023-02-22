import { faker } from '@faker-js/faker'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import LaunchIcon from '@mui/icons-material/Launch'
import UpdateIcon from '@mui/icons-material/Update'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../../App.js'
import AirmanDrawer from '../../AirmanDrawer/AirmanDrawer.js'
import DataTable from '../../DataTable/DataTable.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import 'src/lib/formatters'

const DELETE_TRAINING_MUTATION = gql`
  mutation DeleteTrainingMutation($id: Int!) {
    deleteTraining(id: $id) {
      id
    }
  }
`

const Training = ({ training, airmanTrainings, airmen }) => {
  const currentAirmanTrainings = []
  let trainingRecords = airmanTrainings.filter(
    (airmanTraining) => airmanTraining.trainingId === training.id
  )
  for (let trainingRecord of trainingRecords) {
    currentAirmanTrainings.push(
      airmen.find((airman) => trainingRecord.airmanId === airman.id)
    )
  }

  const { mode } = React.useContext(ThemeModeContext)
  const [deleteTraining] = useMutation(DELETE_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success('Training deleted')
      navigate(routes.trainings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onDeleteClick = (training, id) => {
    if (confirm(`Are you sure you want to delete ${training.name}?`)) {
      deleteTraining({ variables: { id } })
    }
  }
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]
  const data = {
    labels,
    datasets: [
      {
        label: 'Current',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(0, 128, 0)',
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
      },
      {
        label: 'Due',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 255, 0)',
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      },
      {
        label: 'Over Due',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
    ],
  }
  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      width: 125,
      renderCell: (params) => {
        let trainingStatus = airmanTrainings.find(
          (airmanTraining) =>
            airmanTraining.airmanId === params.row.id &&
            airmanTraining.trainingId === training.id
        ).status
        if (trainingStatus === 'Overdue') {
          return (
            <Chip
              sx={{ width: '95px' }}
              label="OVERDUE"
              color="red"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        } else if (trainingStatus === 'Due') {
          return (
            <Chip
              sx={{ width: '95px' }}
              label="DUE"
              color="yellow"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        } else {
          return (
            <Chip
              sx={{ width: '95px' }}
              label="CURRENT"
              color="green"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        }
      },
    },
    { field: 'rank', headerName: 'Rank', flex: 0.75 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'email', headerName: 'E-Mail', flex: 1 },
    { field: 'organization', headerName: 'Organization', flex: 1 },
    { field: 'officeSymbol', headerName: 'Office Symbol', flex: 0.75 },
    { field: 'dodId', headerName: 'DoD ID', flex: 1 },
    { field: 'roles', headerName: 'Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 225,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color={mode === 'light' ? 'grey' : 'primary'}
              onClick={() => navigate(routes.airman({ id: params.row.id }))}
              title={'View'}
            >
              <FindInPageIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => navigate(routes.editAirman({ id: params.row.id }))}
              title={'Edit'}
            >
              <EditIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color={mode === 'light' ? 'red' : 'primary'}
              onClick={() => onDeleteClick(params.row, params.row.id)}
              title={'Delete'}
            >
              <DeleteIcon />
            </Button>
          </>
        )
      },
    },
  ]
  let cardBackground
  if (mode === 'light') {
    ChartJS.defaults.color = 'black'
    ChartJS.defaults.borderColor = 'rgb(49,27,146)'
    cardBackground = 'rgba(155, 155, 155, 0.1)'
  } else {
    ChartJS.defaults.color = 'white'
    ChartJS.defaults.borderColor = 'white'
    cardBackground = 'rgba(0, 0, 0, 0.1)'
  }

  return (
    <>
      <Box display="flex" flexDirection="row" marginBottom="1.75%">
        <Box width="80%" marginRight="1.75%">
          <Card
            sx={{
              backgroundColor: `${cardBackground}`,
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '2%',
              borderRadius: '20px',
            }}
          >
            <CardContent>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="h4">{training.name}</Typography>
                <Stack direction="row" alignItems="flex-start">
                  <Button
                    sx={{ margin: 1 }}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                    onClick={() =>
                      navigate(routes.editTraining({ id: training.id }))
                    }
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    sx={{ margin: 1 }}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                    color={mode === 'light' ? 'red' : 'primary'}
                    onClick={() => onDeleteClick(training, training.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </Stack>
              </Box>
              <Divider />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box width="33%">
                  <Typography variant="h5">
                    CERTIFICTION DURATION
                    <br />
                    {training.duration} Months
                  </Typography>
                </Box>
                <Box width="33%">
                  <Typography variant="h5">
                    TRAINING LINK
                    <br />
                    <Button
                      variant={mode === 'light' ? 'contained' : 'outlined'}
                    >
                      <a
                        href={training.link}
                        target="_blank"
                        rel="noreferrer"
                        title={training.link}
                      >
                        {training.name}
                      </a>
                      <LaunchIcon />
                    </Button>
                  </Typography>
                </Box>
                <Box width="33%">
                  <Typography variant="h5">
                    TAGS
                    <br />
                    {[...Array(parseInt(faker.random.numeric(1)))].map((e) => (
                      <Chip
                        key={e}
                        sx={{ marginX: '1%' }}
                        label="TAG NAME"
                        color={faker.helpers.arrayElement([
                          'red',
                          'orange',
                          'yellow',
                          'green',
                          'blue',
                          'indigo',
                          'purple',
                          'grey',
                        ])}
                      />
                    ))}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              backgroundColor: `${cardBackground}`,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
            }}
          >
            <CardContent>
              <Box height="200px">
                <Line
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                  data={data}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <AssignmentTurnedInIcon fontSize="large" color="grey" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginX="10%"
                  >
                    <Typography variant="h5">
                      {faker.random.numeric(4)}
                    </Typography>
                    <Typography variant="h5">ASSIGNED</Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <CheckCircleOutlineIcon fontSize="large" color="green" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginX="10%"
                  >
                    <Typography variant="h5">
                      {faker.random.numeric(4)}
                    </Typography>
                    <Typography variant="h5">CURRENT</Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <UpdateIcon fontSize="large" color="yellow" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginX="10%"
                  >
                    <Typography variant="h5">
                      {faker.random.numeric(3)}
                    </Typography>
                    <Typography variant="h5">DUE</Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <WarningAmberIcon fontSize="large" color="red" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginX="10%"
                  >
                    <Typography variant="h5">
                      {faker.random.numeric(1)}
                    </Typography>
                    <Typography variant="h5">OVERDUE</Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <CalendarTodayIcon fontSize="large" color="grey" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginX="10%"
                  >
                    <Typography variant="h5">
                      {faker.random.numeric(2)}
                    </Typography>
                    <Typography variant="h5">SCHEDULED</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box width="20%">
          <Card
            sx={{
              backgroundColor: `${cardBackground}`,
              height: '100%',
              borderRadius: '20px',
            }}
          >
            <CardContent>
              <Typography variant="h5">
                DESCRIPTION
                <br />
                <Divider />
                <br />
                {training.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box
        marginBottom="1.75%"
        marginX="1%"
        display="flex"
        justifyContent="flex-end"
      >
        <AirmanDrawer
          airmen={airmen}
          training={training}
          currentAirmanTrainings={currentAirmanTrainings}
        />
      </Box>
      <Card sx={{ backgroundColor: `${cardBackground}`, borderRadius: '20px' }}>
        <CardContent>
          <DataTable rows={currentAirmanTrainings} columns={columns} />
        </CardContent>
      </Card>
    </>
  )
}

export default Training
