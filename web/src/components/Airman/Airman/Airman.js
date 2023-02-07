import { faker } from '@faker-js/faker'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
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
import DataTable from '../../DataTable/DataTable.js'
import SupervisorDrawer from '../../SupervisorDrawer/SupervisorDrawer.js'
import TrainingDrawer from '../../TrainingDrawer/TrainingDrawer.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

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

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
      id
    }
  }
`

const Airman = ({ airman, airmen }) => {
  const [pageSize, setPageSize] = React.useState(10)
  const [displayedMonitor, setDisplayedMonitor] = React.useState(0)
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const columns = [
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'start', headerName: 'Start', flex: 1 },
    { field: 'end', headerName: 'End', flex: 1 },
    { field: 'collection', headerName: 'Collection', flex: 1 },
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
              color="secondary"
              title={'View'}
            >
              <FindInPageIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              title={'Edit'}
            >
              <EditIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color="error"
              title={'Delete'}
            >
              <DeleteIcon />
            </Button>
          </>
        )
      },
    },
  ]
  const monitors = airmen.filter(
    (monitor) =>
      monitor.roles === 'Monitor' &&
      monitor.organization === airman.organization
  )
  const supervisor = airmen.filter(
    (supervisor) => supervisor.id === airman.supervisorId
  )[0]
  const [deleteAirman] = useMutation(DELETE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success('Airman deleted')
      navigate(routes.airmen())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onDeleteClick = (airman, id) => {
    if (
      confirm(
        `Are you sure you want to delete ${airman.rank} ${airman.lastName}, ${airman.firstName}?`
      )
    ) {
      deleteAirman({ variables: { id } })
    }
  }
  const nextMonitor = () => {
    if (displayedMonitor < monitors.length - 1)
      setDisplayedMonitor(displayedMonitor + 1)
  }
  const prevMonitor = () => {
    if (displayedMonitor > 0) {
      setDisplayedMonitor(displayedMonitor - 1)
    }
  }
  const MonitorPagination = () => {
    if (monitors.length > 1) {
      return (
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button onClick={() => prevMonitor()}>
            <ChevronLeftIcon />
          </Button>
          {monitors.indexOf(monitors[displayedMonitor]) + 1}
          <Button onClick={() => nextMonitor()}>
            <ChevronRightIcon />
          </Button>
        </CardActions>
      )
    } else {
      return <></>
    }
  }

  let status, statusColor, statusChip
  let allStatusLatest = []
  let cardBackground
  if (mode === 'light') {
    ChartJS.defaults.borderColor = 'peru'
    cardBackground = 'rgba(155, 155, 155, 0.1)'
  } else {
    ChartJS.defaults.borderColor = 'teal'
    cardBackground = 'rgba(0, 0, 0, 0.75)'
  }
  for (let datum of data.datasets) {
    const statusLatest = datum.data.findLast((int) => Number.isInteger(int))
    allStatusLatest.push(statusLatest)
  }
  if (Math.max(...allStatusLatest) === allStatusLatest[0]) {
    status = 'CURRENT'
    statusColor = 'green'
    statusChip = 'success'
  } else if (Math.max(...allStatusLatest) === allStatusLatest[1]) {
    status = 'DUE'
    statusColor = 'yellow'
    statusChip = 'warning'
  } else {
    status = 'OVER DUE'
    statusColor = 'red'
    statusChip = 'error'
  }

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box width="80%">
          <Box display="flex" flexDirection="row" height="50%">
            <Card
              sx={{
                width: '70%',
                marginBottom: '1%',
                backgroundColor: `${cardBackground}`,
                borderLeft: `10px solid ${statusColor}`,
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography variant="h3">
                    {`${airman.rank} ${airman.lastName}, ${airman.firstName} ${airman.middleName}`}
                  </Typography>
                  <Chip
                    sx={{ margin: '1%' }}
                    label={status}
                    color={statusChip}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                  />
                </Box>
                <Divider />
                <Box display="flex" flexDirection="row">
                  <Typography variant="h6" sx={{ margin: '2%' }}>
                    DOD ID
                    <br />
                    {airman.dodId}
                  </Typography>
                  <Typography variant="h6" sx={{ margin: '2%' }}>
                    E-MAIL ADDRESS
                    <br />
                    {airman.email}
                  </Typography>
                  <Typography variant="h6" sx={{ margin: '2%' }}>
                    AFSC
                    <br />
                    {airman.afsc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: '30%',
                marginBottom: '1%',
                marginX: '1%',
                backgroundColor: `${cardBackground}`,
              }}
            >
              <CardContent>
                {airman.supervisorId ? (
                  <>
                    <Typography variant="h5">SUPERVISOR</Typography>
                    <Divider />
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Typography variant="h7" sx={{ margin: '2%' }}>
                        NAME
                        <br />
                        {`${supervisor.lastName}, ${supervisor.firstName} ${supervisor.middleName}`}
                      </Typography>
                      <Typography variant="h7" sx={{ margin: '2%' }}>
                        RANK
                        <br />
                        {supervisor.rank}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Typography variant="h7" sx={{ margin: '2%' }}>
                        E-MAIL ADDRESS
                        <br />
                        {supervisor.email}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                    >
                      <SupervisorDrawer airman={airman} airmen={airmen} />
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h5">
                      NO ASSIGNED
                      <br />
                      SUPERVISOR
                    </Typography>
                    <Divider />
                    <CardActions
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10%',
                      }}
                    >
                      <SupervisorDrawer airman={airman} airmen={airmen} />
                    </CardActions>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
          <Box display="flex" flexDirection="row" height="50%">
            <Card
              sx={{
                width: '70%',
                marginBottom: '1%',
                backgroundColor: `${cardBackground}`,
              }}
            >
              <Line options={options} data={data} />
            </Card>
            <Card
              sx={{
                width: '30%',
                marginBottom: '1%',
                marginX: '1%',
                backgroundColor: `${cardBackground}`,
              }}
            >
              {monitors[0] ? (
                <>
                  <CardContent>
                    <Typography variant="h5">TRAINING MONITOR</Typography>
                    <Divider />
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Typography variant="h7">
                        <Typography color="primary">NAME</Typography>
                        {`${monitors[displayedMonitor].lastName}, ${monitors[displayedMonitor].firstName} ${monitors[displayedMonitor].middleName}`}
                      </Typography>
                      <Typography variant="h7">
                        <Typography color="primary">RANK</Typography>
                        {monitors[displayedMonitor].rank}
                      </Typography>
                    </Box>
                    <Typography variant="h7">
                      <Typography color="primary">E-MAIL ADDRESS</Typography>
                      {monitors[displayedMonitor].email}
                    </Typography>
                  </CardContent>
                  <MonitorPagination />
                </>
              ) : (
                <CardContent>
                  <Typography variant="h5">
                    NO ASSIGNED
                    <br />
                    TRAINING MONITOR
                  </Typography>
                  <Divider />
                </CardContent>
              )}
            </Card>
          </Box>
        </Box>
        <Box width="20%" marginBottom="0.8%">
          <Card sx={{ height: '100%', backgroundColor: `${cardBackground}` }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5">ORGANIZATION</Typography>
              <Divider />
              <Typography variant="h6">
                <br />
                MAJCOM
                <br />|
                <br />
                NAF
                <br />|
                <br />
                WING
                <br />|
                <br />
                GROUP
                <br />|
                <br />
                {airman.organization}
                <br />|
                <br />
                {airman.officeSymbol}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box marginBottom="1%" display="flex" justifyContent="space-between">
        <Box width="50%">
          <Button
            sx={{ marginX: '1%' }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            size="large"
            color="success"
          >
            Current
          </Button>
          <Button
            sx={{ marginX: '1%' }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            size="large"
            color="warning"
          >
            Due
          </Button>
          <Button
            sx={{ marginX: '1%' }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            size="large"
            color="error"
          >
            Over Due
          </Button>
        </Box>
        <Box width="10%">
          <TrainingDrawer />
        </Box>
      </Box>
      <DataTable rows={[]} columns={columns} />
      <nav className="rw-button-group">
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={() => navigate(routes.editAirman({ id: airman.id }))}
        >
          Edit
        </Button>
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          color="error"
          onClick={() => onDeleteClick(airman, airman.id)}
        >
          Delete
        </Button>
      </nav>
    </>
  )
}

export default Airman
