import AddIcon from '@mui/icons-material/Add'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Training/TrainingsCell'

import { ThemeModeContext } from '../../../App.js'
import AirmanDrawer from '../../AirmanDrawer/AirmanDrawer.js'
import DataTable from '../../DataTable/DataTable.js'

const DELETE_TRAINING_MUTATION = gql`
  mutation DeleteTrainingMutation($id: Int!) {
    deleteTraining(id: $id) {
      id
    }
  }
`

const TrainingsList = ({ trainings, airmen }) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [drawerOpen, setDrawerOpen] = React.useState()
  const [selection, setSelection] = React.useState(trainings)
  const [deleteTraining] = useMutation(DELETE_TRAINING_MUTATION, {
    onCompleted: () => {
      toast.success('Training deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (training, id) => {
    if (confirm(`Are you sure you want to delete ${training.name}?`)) {
      deleteTraining({ variables: { id } })
    }
  }
  const onDeleteSelectedClick = (selection, length) => {
    if (confirm(`Are you sure you want to delete these ${length} trainings?`)) {
      for (let selected of selection) {
        const id = selected.id
        deleteTraining({ variables: { id } })
      }
    }
  }
  const handleAssignAirmen = (selection) => {
    setDrawerOpen(true)
    setSelection(selection)
  }

  const trainingColumns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'duration',
      headerName: 'Certification Duration (Months)',
      flex: 1,
    },
    {
      field: 'link',
      headerName: 'Link',
      flex: 1,
      renderCell: (params) => {
        return (
          <a
            href={params.row.link}
            target="_blank"
            rel="noreferrer"
            title={params.row.link}
          >
            {params.row.link}
          </a>
        )
      },
    },
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
              onClick={() => navigate(routes.training({ id: params.row.id }))}
              title={'View'}
            >
              <FindInPageIcon />
            </IconButton>
            <IconButton
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="large"
              color="primary"
              onClick={() =>
                navigate(routes.editTraining({ id: params.row.id }))
              }
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
  const assignAirmenButton = ({ selection }) => {
    return (
      <Button size="small" onClick={() => handleAssignAirmen(selection)}>
        <AssignmentIndIcon />
        Assign Selected
      </Button>
    )
  }
  const addTrainingButton = () => {
    return (
      <Button size="small" onClick={() => navigate(routes.newTraining())}>
        <AddIcon />
        New Training
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
    <>
      <AirmanDrawer
        airmen={airmen}
        trainings={selection}
        displayButton={false}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <DataTable
        rows={trainings}
        columns={trainingColumns}
        GridToolbarCustomButton={assignAirmenButton}
        GridToolbarAddButton={addTrainingButton}
        GridToolbarDeleteButton={deleteSelectedButton}
      />
    </>
  )
}

export default TrainingsList
