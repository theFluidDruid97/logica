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
import IconButton from '@mui/material/IconButton'
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

import { ranks } from '../../../../../scripts/airmen.js'
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

const DELETE_TRAINING_MUTATION = gql`
  mutation DeleteTrainingMutation($id: Int!) {
    deleteTraining(id: $id) {
      id
    }
  }
`
const DELETE_AIRMAN_TRAINING_MUTATION = gql`
  mutation DeleteAirmanTrainingMutation($id: Int!) {
    deleteAirmanTraining(id: $id) {
      id
    }
  }
`
const UPDATE_AIRMAN_TRAINING_MUTATION = gql`
  mutation UpdateAirmanTrainingMutation(
    $id: Int!
    $input: UpdateAirmanTrainingInput!
  ) {
    updateAirmanTraining(id: $id, input: $input) {
      status
    }
  }
`
const UPDATE_AIRMAN_MUTATION = gql`
  mutation UpdateAirmanMutation($id: Int!, $input: UpdateAirmanInput!) {
    updateAirman(id: $id, input: $input) {
      status
    }
  }
`

const Training = ({ training, airmanTrainings, airmen, certificates }) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectionCount, setSelectionCount] = React.useState(0)
  let mutationCount = 0
  const [deleteTraining] = useMutation(DELETE_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success('Airman training deleted')
      navigate(routes.trainings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: ['FindTrainings'],
  })
  const [deleteAirmanTraining] = useMutation(DELETE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      ++mutationCount
      if (mutationCount + 1 === selectionCount || selectionCount === 1) {
        toast.success(`${selectionCount} airman trainings deleted`)
        setSelectionCount(0)
        mutationCount = 0
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: ['FindTrainingById'],
  })
  const [updateAirmanTraining] = useMutation(UPDATE_AIRMAN_TRAINING_MUTATION, {
    refetchQueries: ['FindTrainingById'],
  })
  const handleUpdateAirmanTraining = (id, input) => {
    updateAirmanTraining({
      variables: { id, input },
    })
  }
  const [updateAirman] = useMutation(UPDATE_AIRMAN_MUTATION, {
    refetchQueries: ['FindAirmen'],
  })
  const handleUpdateAirman = (id, input) => {
    updateAirman({
      variables: { id, input },
    })
  }
  const onDeleteTrainingClick = (id, training) => {
    if (confirm(`Are you sure you want to delete ${training.name}?`)) {
      deleteTraining({ variables: { id } })
    }
  }
  const onDeleteAirmanTrainingClick = (id, training, airman) => {
    setSelectionCount(1)
    if (
      confirm(
        `Are you sure you want to delete ${training.name} training record for ${airman.rank} ${airman.lastName}, ${airman.firstName}?`
      )
    ) {
      deleteAirmanTraining({ variables: { id } })
    }
  }
  const onDeleteSelectedClick = (selection) => {
    setSelectionCount(selection.length)
    if (
      confirm(
        `Are you sure you want to delete these ${selection.length} training records for ${training.name}?`
      )
    ) {
      for (let airmanTraining of selection) {
        const id = airmanTraining.id
        deleteAirmanTraining({ variables: { id } })
      }
    }
  }
  let assignedAirmen = []
  let currentAirmanTrainings = airmanTrainings.filter(
    (airmanTraining) => airmanTraining.trainingId === training.id
  )
  for (let currentAirmanTraining of currentAirmanTrainings) {
    assignedAirmen.push(
      airmen.find((airman) => currentAirmanTraining.airmanId === airman.id)
    )
  }

  React.useEffect(() => {
    for (let currentAirmanTraining of currentAirmanTrainings) {
      const certificateDate = new Date(
        certificates.find(
          (certificate) =>
            certificate.airmanId === currentAirmanTraining.airmanId &&
            certificate.trainingId === currentAirmanTraining.trainingId
        )?.completion
      )
      const isOverDue =
        new Date(
          certificateDate.setMonth(
            certificateDate.getMonth() + training.duration
          )
        ).getTime() < new Date().getTime()
      const isDue =
        new Date(
          certificateDate.setMonth(certificateDate.getMonth() - 2)
        ).getTime() < new Date().getTime()
      const noCert = isNaN(
        new Date(
          certificateDate.setMonth(certificateDate.getMonth() - 2)
        ).getTime()
      )
      let status = 'Current'
      if (noCert) {
        if (currentAirmanTraining.end) {
          if (
            new Date(currentAirmanTraining.end).getTime() < new Date().getTime()
          ) {
            status = 'Overdue'
          }
        } else {
          status = 'Due'
        }
      } else if (isOverDue) {
        status = 'Overdue'
      } else if (isDue) {
        status = 'Due'
      }
      handleUpdateAirmanTraining(currentAirmanTraining.id, {
        status,
      })
    }
  }, [airmanTrainings.length, certificates])

  React.useEffect(() => {
    for (let airman of airmen) {
      if (
        currentAirmanTrainings.find(
          (currentAirmanTraining) => currentAirmanTraining.status === 'Overdue'
        )
      ) {
        handleUpdateAirman(airman.id, { status: 'Overdue' })
      } else if (
        currentAirmanTrainings.find(
          (currentAirmanTraining) => currentAirmanTraining.status === 'Due'
        )
      ) {
        handleUpdateAirman(airman.id, { status: 'Due' })
      } else {
        handleUpdateAirman(airman.id, { status: 'Current' })
      }
    }
  }, [airmanTrainings])

  const rankComparator = (rank1, rank2) =>
    ranks.indexOf(rank1) - ranks.indexOf(rank2)
  const airmanTrainingColumns = [
    {
      field: 'status',
      headerName: 'Status',
      width: 125,
      renderCell: (params) => {
        let chipColor
        if (params.row.status === 'Overdue') {
          chipColor = 'red'
        } else if (params.row.status === 'Due') {
          chipColor = 'yellow'
        } else {
          chipColor = 'green'
        }
        return (
          <Chip
            sx={{ width: '95px' }}
            label={params.row.status.toUpperCase()}
            color={chipColor}
            variant={mode === 'light' ? 'contained' : 'outlined'}
          />
        )
      },
    },
    {
      field: 'rank',
      headerName: 'Rank',
      flex: 0.75,
      sortComparator: rankComparator,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).rank,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).lastName,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).firstName,
    },
    {
      field: 'middleName',
      headerName: 'Middle Name',
      flex: 1,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).middleName,
    },
    {
      field: 'email',
      headerName: 'E-Mail',
      flex: 1,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).email,
    },
    {
      field: 'organization',
      headerName: 'Organization',
      flex: 1,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).organization,
    },
    {
      field: 'officeSymbol',
      headerName: 'Office Symbol',
      flex: 0.75,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).officeSymbol,
    },
    {
      field: 'dodId',
      headerName: 'DoD ID',
      flex: 1,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).dodId,
    },
    {
      field: 'roles',
      headerName: 'Role',
      flex: 1,
      renderCell: (params) =>
        airmen.find((airman) => airman.id === params.row.airmanId).roles,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 180,
      renderCell: (params) => {
        const airman = airmen.find(
          (airman) => airman.id === params.row.airmanId
        )
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              size="large"
              color={mode === 'light' ? 'grey' : 'primary'}
              onClick={() => navigate(routes.airman({ id: airman.id }))}
              title={'View'}
            >
              <FindInPageIcon />
            </IconButton>
            <IconButton
              size="large"
              color="primary"
              onClick={() => navigate(routes.editAirman({ id: airman.id }))}
              title={'Edit'}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="large"
              color="red"
              onClick={() =>
                onDeleteAirmanTrainingClick(params.row.id, training, airman)
              }
              title={'Delete'}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
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
        tension: 0.2,
      },
      {
        label: 'Due',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 255, 0)',
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        tension: 0.2,
      },
      {
        label: 'Over Due',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        tension: 0.2,
      },
    ],
  }
  const deleteSelectedButton = ({ selection }) => {
    return (
      <Button
        size="small"
        color="red"
        onClick={() => onDeleteSelectedClick(selection)}
      >
        <DeleteIcon />
        Delete Selected
      </Button>
    )
  }

  return (
    <>
      <Box display="flex" flexDirection="row" marginBottom="4%" height="50vh">
        <Box width="80%" marginRight="2%">
          <Card
            sx={{
              backgroundColor: `${cardBackground}`,
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '2.75%',
              borderRadius: '20px',
              height: '50%',
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
                    color="red"
                    onClick={() => onDeleteTrainingClick(training.id, training)}
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
                marginTop="1%"
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
                        sx={{ margin: '1%' }}
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
              height: '50%',
            }}
          >
            <CardContent>
              <Box height="170px">
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
                    <Typography variant="h7">
                      {faker.random.numeric(4)}
                    </Typography>
                    <Typography variant="h7">ASSIGNED</Typography>
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
                    <Typography variant="h7">
                      {faker.random.numeric(4)}
                    </Typography>
                    <Typography variant="h7">CURRENT</Typography>
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
                    <Typography variant="h7">
                      {faker.random.numeric(3)}
                    </Typography>
                    <Typography variant="h7">DUE</Typography>
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
                    <Typography variant="h7">
                      {faker.random.numeric(1)}
                    </Typography>
                    <Typography variant="h7">OVERDUE</Typography>
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
                    <Typography variant="h7">
                      {faker.random.numeric(2)}
                    </Typography>
                    <Typography variant="h7">SCHEDULED</Typography>
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
              height: '54vh',
              borderRadius: '20px',
              overflowY: 'auto',
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
        marginBottom="2%"
        marginX="1%"
        display="flex"
        justifyContent="flex-end"
      >
        <AirmanDrawer
          airmen={airmen}
          training={training}
          assignedAirmen={assignedAirmen}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
      <Card sx={{ backgroundColor: `${cardBackground}`, borderRadius: '20px' }}>
        <CardContent>
          <DataTable
            rows={currentAirmanTrainings}
            columns={airmanTrainingColumns}
            GridToolbarDeleteButton={deleteSelectedButton}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default Training
