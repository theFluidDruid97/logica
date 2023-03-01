import { faker } from '@faker-js/faker'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
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
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ranks } from '../../../../../scripts/airmen.js'
import { ThemeModeContext } from '../../../App.js'
import AirmanDrawer from '../../AirmanDrawer/AirmanDrawer.js'
import DataTable from '../../DataTable/DataTable.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const DELETE_COLLECTION_MUTATION = gql`
  mutation DeleteCollectionMutation($id: Int!) {
    deleteCollection(id: $id) {
      id
    }
  }
`

const Collection = ({ collection, airmen, trainings }) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [dataTable, setDataTable] = React.useState('airmen')
  const [deleteCollection] = useMutation(DELETE_COLLECTION_MUTATION, {
    onCompleted: () => {
      toast.success('Collection deleted')
      navigate(routes.collections())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onDeleteCollectionClick = (id) => {
    if (confirm(`Are you sure you want to delete ${collection.name}?`)) {
      deleteCollection({ variables: { id } })
    }
  }
  const labels = [
    'Tranining 1',
    'Tranining 2',
    'Tranining 3',
    'Tranining 4',
    'Tranining 5',
    'Tranining 6',
    // 'Tranining 8',
    // 'Tranining 9',
    // 'Tranining 10',
    // 'Tranining 11',
    // 'Tranining 12',
    // 'Tranining 13',
    // 'Tranining 14',
    // 'Tranining 15',
    // 'Tranining 16',
    // 'Tranining 17',
    // 'Tranining 18',
    // 'Tranining 18',
    // 'Tranining 19',
    // 'Tranining 20',
  ]
  const combinedData = []
  for (let label of labels) {
    const current = faker.datatype.number({ min: 0, max: 100 })
    const due = faker.datatype.number({ min: current, max: 100 })
    const overdue = faker.datatype.number({ min: 100, max: 100 })
    combinedData.push({ label, current, due, overdue })
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Current',
        data: combinedData.map((data) => data.current),
        fill: true,
        backgroundColor: 'rgba(56, 142, 60, 0.5)',
        borderColor: 'rgb(56, 142, 60)',
        pointBackgroundColor: 'rgb(56, 142, 60)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(56, 142, 60)',
      },
      {
        label: 'Due',
        data: combinedData.map((data) => data.due),
        fill: true,
        backgroundColor: 'rgba(255, 235, 59, 0.5)',
        borderColor: 'rgb(255, 235, 59)',
        pointBackgroundColor: 'rgb(255, 235, 59)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 235, 59)',
      },
      {
        label: 'Overdue',
        data: combinedData.map((data) => data.overdue),
        fill: true,
        backgroundColor: 'rgba(211, 47, 47, 0.5)',
        borderColor: 'rgb(211, 47, 47)',
        pointBackgroundColor: 'rgb(211, 47, 47)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(211, 47, 47)',
      },
    ],
  }
  const rankComparator = (rank1, rank2) =>
    ranks.indexOf(rank1) - ranks.indexOf(rank2)
  const trainingCollectionAirmenColumns = [
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
              color={mode === 'light' ? 'red' : 'primary'}
              // onClick={() =>
              //   onDeleteAirmanTrainingClick(params.row.id, training, airman)
              // }
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
                <Typography variant="h4">{collection.name}</Typography>
                <Stack direction="row" alignItems="flex-start">
                  <Button
                    sx={{ margin: 1 }}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                    onClick={() =>
                      navigate(routes.editCollection({ id: collection.id }))
                    }
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    sx={{ margin: 1 }}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                    color={mode === 'light' ? 'red' : 'primary'}
                    onClick={() => onDeleteCollectionClick(collection.id)}
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
                    DESCRIPTION
                    <br />
                    {collection.description}
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
            <CardContent>PLACEHOLDER</CardContent>
          </Card>
        </Box>
        <Box width="20%">
          <Card
            sx={{
              backgroundColor: `${cardBackground}`,
              height: '54vh',
              borderRadius: '20px',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h5">
                OVERALL STATUS BY TRAINING
                <br />
                <Divider />
                <br />
              </Typography>
              <Radar
                data={data}
                options={{
                  scales: {
                    r: {
                      ticks: {
                        display: false,
                      },
                      min: 0,
                      max: 100,
                    },
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItems) {
                          const data = combinedData.find(
                            (data) => data.label === tooltipItems.label
                          )
                          const key = tooltipItems.dataset.label.toLowerCase()
                          if (key === 'current') {
                            return `${data[key]}%`
                          } else if (key === 'due') {
                            return `${data[key] - data.current}%`
                          } else {
                            return `${data[key] - data.due}%`
                          }
                        },
                      },
                    },
                  },
                }}
              />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  marginY="3%"
                >
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
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  marginY="3%"
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
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box marginBottom="2%" display="flex">
        <Box width="50%">
          <Button
            sx={{ marginX: '1%' }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setDataTable('airmen')}
          >
            Airmen
          </Button>
          <Button
            sx={{ marginX: '1%' }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setDataTable('trainings')}
          >
            Trainings
          </Button>
        </Box>
        <Box width="50%" display="flex" justifyContent="flex-end">
          <Box marginX="1%">
            {/* <AirmanDrawer
              trainings={trainings}
              airmen={airmen}
            /> */}
          </Box>
          <Box marginX="1%">
            {/* <CertificateDrawer trainings={trainings} airman={airman} /> */}
          </Box>
        </Box>
      </Box>
      <Card sx={{ backgroundColor: `${cardBackground}`, borderRadius: '20px' }}>
        <CardContent>
          {dataTable === 'airmen' ? (
            <DataTable
              rows={airmen}
              columns={trainingCollectionAirmenColumns}
            />
          ) : (
            <DataTable />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default Collection
