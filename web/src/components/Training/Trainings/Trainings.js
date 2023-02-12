import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Button from '@mui/material/Button'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Training/TrainingsCell'

import { ThemeModeContext } from '../../../App.js'
import DataTable from '../../DataTable/DataTable.js'

const DELETE_TRAINING_MUTATION = gql`
  mutation DeleteTrainingMutation($id: Int!) {
    deleteTraining(id: $id) {
      id
    }
  }
`

const TrainingsList = ({ trainings }) => {
  const { mode } = React.useContext(ThemeModeContext)
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

  const columns = [
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
      width: 225,
      renderCell: (params) => {
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

  return <DataTable rows={trainings} columns={columns} />
}

export default TrainingsList
