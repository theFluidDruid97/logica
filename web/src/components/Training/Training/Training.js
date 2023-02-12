import { faker } from '@faker-js/faker'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LaunchIcon from '@mui/icons-material/Launch'
import UpdateIcon from '@mui/icons-material/Update'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../../App.js'
import DataTable from '../../DataTable/DataTable.js'

import 'src/lib/formatters'

const DELETE_TRAINING_MUTATION = gql`
  mutation DeleteTrainingMutation($id: Int!) {
    deleteTraining(id: $id) {
      id
    }
  }
`

const Training = ({ training }) => {
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
  let cardBackground
  if (mode === 'light') {
    cardBackground = 'rgba(155, 155, 155, 0.1)'
  } else {
    cardBackground = 'rgba(0, 0, 0, 0.75)'
  }

  return (
    <>
      <Box display="flex" flexDirection="row" marginBottom="1%">
        <Box width="80%" marginRight="1%">
          <Card
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: `${cardBackground}`,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="h3" sx={{ marginLeft: '2%' }}>
                  {training.name}
                </Typography>
                <nav className="rw-button-group">
                  <Button
                    sx={{ marginX: 1 }}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                    onClick={() =>
                      navigate(routes.editTraining({ id: training.id }))
                    }
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    sx={{ marginX: 1 }}
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                    color="red"
                    onClick={() => onDeleteClick(training, training.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </nav>
              </Box>
              <Divider />
              <Typography variant="h6" sx={{ margin: '2%' }}>
                DESCRIPTION
                <br />
                <Divider />
                <br />
                {training.description}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="h6" sx={{ margin: '2%', width: '33%' }}>
                  CERTIFICTION DURATION
                  <br />
                  <Divider />
                  <br />
                  {training.duration} Months
                </Typography>
                <Typography variant="h6" sx={{ margin: '2%', width: '33%' }}>
                  TRAINING LINK
                  <br />
                  <Divider />
                  <br />
                  <Button variant={mode === 'light' ? 'contained' : 'outlined'}>
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
                <Typography variant="h6" sx={{ margin: '2%', width: '33%' }}>
                  TAGS
                  <br />
                  <Divider />
                  <br />
                  {[
                    ...Array(
                      parseInt(
                        faker.random.numeric(1, {
                          bannedDigits: ['0', '5', '6', '7', '8', '9'],
                        })
                      )
                    ),
                  ].map((e) => (
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
            </CardContent>
          </Card>
        </Box>
        <Box width="20%">
          <Card sx={{ height: '100%', backgroundColor: `${cardBackground}` }}>
            <Box display="flex" flexDirection="column" height="100%">
              <Typography
                variant="h4"
                sx={{ margin: '2%', marginTop: '10%', textAlign: 'center' }}
              >
                OVERALL STATUS
                <br />
                <Divider />
                <br />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  marginTop="5%"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="50%"
                  >
                    <CheckCircleOutlineIcon fontSize="large" color="green" />
                    <Typography variant="h5">
                      {faker.random.numeric(4)}
                    </Typography>
                    <Typography variant="h5">CURRENT</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="50%"
                  >
                    <CalendarTodayIcon fontSize="large" color="grey" />
                    <Typography variant="h5">
                      {faker.random.numeric(2)}
                    </Typography>
                    <Typography variant="h5">SCHEDULED</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  marginTop="15%"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="50%"
                  >
                    <UpdateIcon fontSize="large" color="yellow" />
                    <Typography variant="h5">
                      {faker.random.numeric(3)}
                    </Typography>
                    <Typography variant="h5">DUE</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="50%"
                  >
                    <WarningAmberIcon fontSize="large" color="red" />
                    <Typography variant="h5">
                      {faker.random.numeric(1)}
                    </Typography>
                    <Typography variant="h5">OVERDUE</Typography>
                  </Box>
                </Box>
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
      <Box marginBottom="1%" display="flex" justifyContent="flex-end">
        <Button
          sx={{ marginX: '1%' }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          size="large"
        >
          Assign Airmen
        </Button>
      </Box>
      <DataTable rows={[]} columns={[]} />
    </>
  )
}

export default Training
