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

const DELETE_CERTIFICATE_MUTATION = gql`
  mutation DeleteCertificateMutation($id: Int!) {
    deleteCertificate(id: $id) {
      id
    }
  }
`
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
const UPDATE_AIRMAN_MUTATION = gql`
  mutation UpdateAirmanStatusMutation($id: Int!, $input: UpdateAirmanInput!) {
    updateAirman(id: $id, input: $input) {
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
  const [dataTable, setDataTable] = React.useState('trainings')
  const [displayedMonitor, setDisplayedMonitor] = React.useState(0)
  const [selectionCount, setSelectionCount] = React.useState(0)
  let mutationCount = 0
  const monitors = airmen.filter(
    (monitor) =>
      monitor.roles === 'Monitor' &&
      monitor.organization === airman.organization
  )
  const supervisor = airmen.filter(
    (supervisor) => supervisor.id === airman.supervisorId
  )[0]
  const currentAirmanTrainings = airmanTrainings.filter(
    (airmanTraining) => airmanTraining.airmanId === airman.id
  )
  const currentCertificates = certificates.filter(
    (certificate) => certificate.airmanId === airman.id
  )
  const [updateAirmanTraining] = useMutation(UPDATE_AIRMAN_TRAINING_MUTATION, {
    refetchQueries: ['FindAirmanById'],
  })
  const [updateAirman] = useMutation(UPDATE_AIRMAN_MUTATION, {
    refetchQueries: ['FindAirmanById'],
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
    refetchQueries: ['FindAirmanById'],
  })
  const handleUpdateAirmanTraining = (id, input) => {
    updateAirmanTraining({
      variables: { id, input },
    })
  }
  const handleUpdateAirman = (id, input) => {
    updateAirman({
      variables: { id, input },
    })
  }
  const onDeleteSelectedClick = (selection) => {
    setSelectionCount(selection.length)
    if (
      confirm(
        `Are you sure you want to delete these ${selection.length} training records for ${airman.rank} ${airman.lastName},  ${airman.firstName} ${airman.middleName}?`
      )
    ) {
      for (let airmanTraining of selection) {
        const id = airmanTraining.id
        deleteAirmanTraining({ variables: { id } })
      }
    }
  }

  React.useEffect(() => {
    for (let currentAirmanTraining of currentAirmanTrainings) {
      const training = trainings.find(
        (training) => training.id === currentAirmanTraining.trainingId
      )
      const certificateDate = new Date(
        certificates.find(
          (certificate) =>
            certificate.airmanId === airman.id &&
            certificate.trainingId === training.id
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
        status: status,
      })
    }
  }, [airmanTrainings.length, certificates])

  React.useEffect(() => {
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
  }, [airmanTrainings])

  const trainingsColumns = [
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
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
      width: 180,
      renderCell: (params) => {
        const training = trainings.find(
          (training) => training.id === params.row.trainingId
        )
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="large"
              color={mode === 'light' ? 'grey' : 'primary'}
              onClick={() =>
                navigate(routes.training({ id: params.row.trainingId }))
              }
              title={'View'}
            >
              <FindInPageIcon />
            </IconButton>
            <IconButton
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="large"
              color="primary"
              onClick={() =>
                navigate(routes.editTraining({ id: params.row.trainingId }))
              }
              title={'Edit'}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="large"
              color="red"
              onClick={() =>
                onDeleteAirmanTrainingClick(training, params.row.id)
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
  const [deleteAirman] = useMutation(DELETE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success('Airman deleted')
      navigate(routes.airmen())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [deleteCertificate] = useMutation(DELETE_CERTIFICATE_MUTATION, {
    onCompleted: () => {
      toast.success('Certification deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: ['FindAirmanById'],
  })
  const thumbnail = (url) => {
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=width:500')
    return parts.join('/')
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
  const onDeleteCertificateClick = (training, id) => {
    if (
      confirm(
        `Are you sure you want to delete ${training.name} certification for ${airman.rank} ${airman.lastName}, ${airman.firstName}?`
      )
    ) {
      deleteCertificate({ variables: { id } })
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
  if (mode === 'light') {
    ChartJS.defaults.color = 'black'
    ChartJS.defaults.borderColor = 'rgb(49,27,146)'
    cardBackground = 'rgba(155, 155, 155, 0.1)'
  } else {
    ChartJS.defaults.color = 'white'
    ChartJS.defaults.borderColor = 'white'
    cardBackground = 'rgba(0, 0, 0, 0.1)'
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
      <Box display="flex" flexDirection="row">
        <Box width="80%">
          <Box display="flex" flexDirection="row" height="260px">
            <Card
              sx={{
                width: '70%',
                backgroundColor: `${cardBackground}`,
                marginBottom: '2%',
                display: 'flex',
                borderRadius: '20px',
              }}
            >
              <Box className={airman.status.toLowerCase()}>
                <Box
                  className="flipper"
                  color={airman.status === 'Due' ? 'black' : 'white'}
                >
                  {airman.status.toUpperCase()}
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                padding="1%"
                width="96%"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  padding="1%"
                >
                  <Typography variant="h4">
                    {`${airman.rank} ${airman.lastName}, ${airman.firstName} ${airman.middleName}`}
                  </Typography>
                  <Stack
                    spacing={2}
                    sx={{ paddingBottom: '1%' }}
                    direction="row"
                    alignItems="flex-start"
                  >
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
                <Divider />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    width="80%"
                    justifyContent="space-between"
                  >
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
                </Box>
              </Box>
            </Card>
            <Card
              sx={{
                width: '30%',
                marginBottom: '2%',
                marginX: '2%',
                backgroundColor: `${cardBackground}`,
                borderRadius: '20px',
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
          <Box display="flex" flexDirection="row">
            <Card
              sx={{
                width: '70%',
                marginBottom: '2%',
                backgroundColor: `${cardBackground}`,
                borderRadius: '20px',
              }}
            >
              <CardContent sx={{ height: '260px' }}>
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
              </CardContent>
            </Card>
            <Card
              sx={{
                width: '30%',
                marginBottom: '2%',
                marginX: '2%',
                backgroundColor: `${cardBackground}`,
                borderRadius: '20px',
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
        <Box width="20%" marginBottom="1.6%">
          <Card
            sx={{
              height: '100%',
              backgroundColor: `${cardBackground}`,
              borderRadius: '20px',
            }}
          >
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
      <Box marginBottom="2%" display="flex">
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
            <TrainingDrawer
              trainings={trainings}
              airman={airman}
              currentAirmanTrainings={currentAirmanTrainings}
            />
          </Box>
          <Box marginX="1%">
            <CertificateDrawer trainings={trainings} airman={airman} />
          </Box>
        </Box>
      </Box>
      {dataTable === 'trainings' ? (
        <Card
          sx={{ backgroundColor: `${cardBackground}`, borderRadius: '20px' }}
        >
          <CardContent>
            <DataTable
              rows={currentAirmanTrainings}
              columns={trainingsColumns}
              GridToolbarDeleteButton={deleteSelectedButton}
            />
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            height: '89vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            padding: '0.5%',
            backgroundColor: `${cardBackground}`,
            borderRadius: '20px',
          }}
        >
          <Box
            height="97%"
            width="100%"
            border={
              mode === 'light'
                ? '1px solid rgb(231,229,241)'
                : '1px solid rgb(81,81,81)'
            }
            borderRadius="5px"
            margin="7px"
          >
            {currentCertificates.map((certificate) => (
              <Card
                sx={{
                  width: 335,
                  backgroundColor: `${cardBackground}`,
                  margin: '1%',
                  height: 370,
                }}
                key={certificate.id}
              >
                <CardContent>
                  <img
                    src={thumbnail(certificate.url)}
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
                  <Stack spacing={21.5} direction="row">
                    <Button
                      variant={mode === 'light' ? 'contained' : 'outlined'}
                      onClick={() =>
                        window.alert(
                          'This feature is still in development. Have some damn patience.'
                        )
                      }
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant={mode === 'light' ? 'contained' : 'outlined'}
                      color={mode === 'light' ? 'red' : 'primary'}
                      onClick={() =>
                        onDeleteCertificateClick(
                          trainings.find(
                            (training) => training.id === certificate.trainingId
                          ),
                          certificate.id
                        )
                      }
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Card>
      )}
    </>
  )
}

export default Airman
