import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ranks } from '../../../../../scripts/airmen.js'
import { ThemeModeContext } from '../../../App.js'
import DataTable from '../../DataTable/DataTable.js'

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
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

const AirmenList = ({ airmen, trainings, airmanTrainings, certificates }) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [deleteAirman] = useMutation(DELETE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success('Airman deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: ['FindAirmen'],
    awaitRefetchQueries: true,
  })
  const [updateAirmanTraining] = useMutation(UPDATE_AIRMAN_TRAINING_MUTATION, {
    refetchQueries: ['FindAirmen'],
    awaitRefetchQueries: true,
  })
  const [updateAirman] = useMutation(UPDATE_AIRMAN_MUTATION, {
    refetchQueries: ['FindAirmen'],
    awaitRefetchQueries: true,
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
  const onDeleteClick = (airman, id) => {
    if (
      confirm(
        `Are you sure you want to delete ${airman.rank} ${airman.lastName}, ${airman.firstName}?`
      )
    ) {
      deleteAirman({ variables: { id } })
    }
  }
  const onDeleteSelectedClick = (selection, length) => {
    if (confirm(`Are you sure you want to delete these ${length} Airmen?`)) {
      for (let selected of selection) {
        const id = selected.id
        deleteAirman({ variables: { id } })
      }
    }
  }

  React.useEffect(() => {
    for (let airman of airmen) {
      const currentAirmanTrainings = airmanTrainings.filter(
        (airmanTraining) => airmanTraining.airmanId === airman.id
      )
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
              new Date(currentAirmanTraining.end).getTime() <
              new Date().getTime()
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
  }, [])

  const rankComparator = (rank1, rank2) =>
    ranks.indexOf(rank1) - ranks.indexOf(rank2)
  const airmanColumns = [
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
    },
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
      width: 180,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="large"
              color={mode === 'light' ? 'grey' : 'primary'}
              onClick={() => navigate(routes.airman({ id: params.row.id }))}
              title={'View'}
            >
              <FindInPageIcon />
            </IconButton>
            <IconButton
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="large"
              color="primary"
              onClick={() => navigate(routes.editAirman({ id: params.row.id }))}
              title={'Edit'}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="large"
              color="red"
              onClick={() => onDeleteClick(params.row, params.row.id)}
              title={'Delete'}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        )
      },
    },
  ]
  const addAirmanButton = () => {
    return (
      <Button size="small" onClick={() => navigate(routes.newAirman())}>
        <AddIcon />
        Add Airman
      </Button>
    )
  }
  const deleteSelectedButton = ({ selection }) => {
    return (
      <Button
        size="small"
        color="red"
        onClick={() => onDeleteSelectedClick(selection, selection.length)}
      >
        <DeleteIcon />
        Delete Selected
      </Button>
    )
  }

  return (
    <DataTable
      rows={airmen}
      columns={airmanColumns}
      GridToolbarAddButton={addAirmanButton}
      GridToolbarDeleteButton={deleteSelectedButton}
    />
  )
}

export default AirmenList
