import { faker } from '@faker-js/faker'
import CheckIcon from '@mui/icons-material/Check'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
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
import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../../App.js'
import CertificateDrawer from '../../CertificateDrawer/CertificateDrawer.js'
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

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
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

const Airman = ({
  airman,
  airmen,
  trainings,
  airmanTrainings,
  certificates,
}) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [updateAirmanTraining] = useMutation(UPDATE_AIRMAN_TRAINING_MUTATION)
  const [dataTable, setDataTable] = React.useState('trainings')
  const [displayedMonitor, setDisplayedMonitor] = React.useState(0)
  const [updated, setUpdated] = React.useState(false)
  const monitors = airmen.filter(
    (monitor) =>
      monitor.roles === 'Monitor' &&
      monitor.organization === airman.organization
  )
  const supervisor = airmen.filter(
    (supervisor) => supervisor.id === airman.supervisorId
  )[0]
  const currentAirmanTrainings = airmanTrainings.filter(
    (record) => record.airmanId === airman.id
  )
  const currentCertificates = certificates.filter(
    (certificate) => certificate.airmanId === airman.id
  )
  const update = (input, id) => {
    updateAirmanTraining({
      variables: { id, input },
    })
  }
  const trainingsColumns = [
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const duration = trainings.find(
          (training) => training.id === params.row.trainingId
        ).duration
        const certificateDate = new Date(
          currentCertificates?.find(
            (certificate) => certificate.trainingId === params.row.trainingId
          )?.completion
        )
        const isOverDue =
          new Date(
            certificateDate.setMonth(certificateDate.getMonth() + duration)
          ).getTime() < new Date().getTime()
        const isDue =
          new Date(
            certificateDate.setMonth(certificateDate.getMonth() - 2)
          ).getTime() < new Date().getTime()
        if (isOverDue) {
          if (!updated) {
            update({ status: 'Overdue' }, params.row.id)
            setUpdated(true)
          }
          return (
            <Chip
              label="OVER DUE"
              color="red"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        } else if (
          isDue ||
          isNaN(
            new Date(
              certificateDate.setMonth(certificateDate.getMonth() - 2)
            ).getTime()
          )
        ) {
          if (!updated) {
            update({ status: 'Due' }, params.row.id)
            setUpdated(true)
          }
          return (
            <Chip
              label="DUE"
              color="yellow"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        } else {
          if (!updated) {
            update({ status: 'Current' }, params.row.id)
            setUpdated(true)
          }
          return (
            <Chip
              label="CURRENT"
              color="green"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        }
      },
    },
    {
      field: 'training',
      headerName: 'Training',
      flex: 1,
      renderCell: (params) => {
        return trainings.find(
          (training) => training.id === params.row.trainingId
        ).name
      },
    },
    { field: 'start', headerName: 'Start', flex: 1 },
    { field: 'end', headerName: 'End', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 225,
      renderCell: (params) => {
        const training = trainings.find(
          (training) => training.id === params.row.trainingId
        )
        return (
          <>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color="grey"
              onClick={() => navigate(routes.training({ id: params.row.id }))}
              title={'View'}
            >
              <FindInPageIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={() =>
                navigate(routes.editTraining({ id: params.row.id }))
              }
              title={'Edit'}
            >
              <EditIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color="red"
              onClick={() =>
                onDeleteAirmanTrainingClick(training, params.row.id)
              }
              title={'Delete'}
            >
              <DeleteIcon />
            </Button>
          </>
        )
      },
    },
  ]
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
  const [deleteAirman] = useMutation(DELETE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success('Airman deleted')
      navigate(routes.airmen())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [deleteAirmanTraining] = useMutation(DELETE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success('Airman training deleted')
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
  const onDeleteAirmanTrainingClick = (training, id) => {
    if (
      confirm(
        `Are you sure you want to delete ${training.name} training record for\n${airman.rank} ${airman.lastName}, ${airman.firstName}?`
      )
    ) {
      deleteAirmanTraining({ variables: { id } })
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
  let cardBackground
  let status = {}
  if (
    currentAirmanTrainings.find((training) => training.status === 'Overdue')
  ) {
    status.name = 'OVER DUE'
    status.color = 'red'
  } else if (
    currentAirmanTrainings.find((training) => training.status === 'Due')
  ) {
    status.name = 'DUE'
    status.color = 'yellow'
  } else {
    status.name = 'CURRENT'
    status.color = 'green'
  }
  if (mode === 'light') {
    ChartJS.defaults.color = 'black'
    ChartJS.defaults.borderColor = 'peru'
    cardBackground = 'rgba(155, 155, 155, 0.1)'
  } else {
    ChartJS.defaults.color = 'white'
    ChartJS.defaults.borderColor = '#80cbc4'
    cardBackground = 'rgba(0, 0, 0, 0.75)'
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
                borderLeft: `10px solid ${status.color}`,
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
                    label={status.name}
                    color={status.color}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                  />
                </Box>
                <Divider />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDirection="row" width="80%">
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
                  <Stack spacing={2} sx={{ marginTop: '2%' }}>
                    <Button
                      variant={mode === 'light' ? 'contained' : 'outlined'}
                      onClick={() =>
                        navigate(routes.editAirman({ id: airman.id }))
                      }
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant={mode === 'light' ? 'contained' : 'outlined'}
                      color="red"
                      onClick={() => onDeleteClick(airman, airman.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
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
                        <Typography>NAME</Typography>
                        {`${monitors[displayedMonitor].lastName}, ${monitors[displayedMonitor].firstName} ${monitors[displayedMonitor].middleName}`}
                      </Typography>
                      <Typography variant="h7">
                        <Typography>RANK</Typography>
                        {monitors[displayedMonitor].rank}
                      </Typography>
                    </Box>
                    <Typography variant="h7">
                      <Typography>E-MAIL ADDRESS</Typography>
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
              <Typography variant="h6" sx={{ margin: '10%' }}>
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
      <Box marginBottom="1%" display="flex">
        <Box width="50%">
          <Button
            sx={{ marginX: '1%' }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setDataTable('trainings')}
          >
            Trainings
          </Button>
          <Button
            sx={{ marginX: '1%' }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            size="large"
            onClick={() => setDataTable('certificates')}
          >
            Certificates
          </Button>
        </Box>
        <Box width="50%" display="flex" justifyContent="flex-end">
          <Box marginX="1%">
            <TrainingDrawer trainings={trainings} airman={airman} />
          </Box>
          <Box marginX="1%">
            <CertificateDrawer trainings={trainings} airman={airman} />
          </Box>
        </Box>
      </Box>
      {dataTable === 'trainings' ? (
        <DataTable rows={currentAirmanTrainings} columns={trainingsColumns} />
      ) : (
        <Card
          sx={{
            height: '89vh',
            width: '100%',
            padding: '0.5%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: mode === 'light' ? 'solid 0.1px white' : 'solid 0.1px grey',
          }}
        >
          <CardContent>
            {currentCertificates.map((certificate) => (
              <Card
                sx={{
                  width: 335,
                  backgroundColor: `${cardBackground}`,
                  margin: '1%',
                }}
                key={certificate.id}
              >
                <CardContent>
                  <img
                    src={certificate.url}
                    alt="no content"
                    height="200"
                    width="300"
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>Training</span>
                    {
                      trainings.find(
                        (training) => training.id === certificate.trainingId
                      ).name
                    }
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>Completion</span>
                    {format(
                      new Date(
                        certificate.completion.split('T')[0].split('-')[0],
                        certificate.completion.split('T')[0].split('-')[1] - 1,
                        certificate.completion.split('T')[0].split('-')[2] - 1
                      ),
                      'ddMMMyyyy'
                    ).toUpperCase()}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>Validated</span>
                    {certificate.validated === true ? (
                      <CheckIcon color="green" fontSize="large" />
                    ) : (
                      <CloseIcon color="red" fontSize="large" />
                    )}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default Airman
