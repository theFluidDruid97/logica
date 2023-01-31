import Button from '@mui/material/Button'
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Training/TrainingsCell'

const DELETE_TRAINING_MUTATION = gql`
  mutation DeleteTrainingMutation($id: Int!) {
    deleteTraining(id: $id) {
      id
    }
  }
`

const TrainingsList = ({ trainings }) => {
  const [pageSize, setPageSize] = React.useState()
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
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'duration', headerName: 'Duration (Months)', flex: 0.5 },
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
    { field: 'collections', headerName: 'Collections', flex: 1 },
    {
      field: 'Show',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => navigate(routes.training({ id: params.row.id }))}
            color="secondary"
            title={`Show ${params.row.name} Details`}
          >
            Show
          </Button>
        )
      },
    },
    {
      field: 'Edit',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => navigate(routes.editTraining({ id: params.row.id }))}
            title={`Edit ${params.row.name} Details`}
          >
            Edit
          </Button>
        )
      },
    },
    {
      field: 'Delete',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            title={`Delete ${params.row.name}`}
            color="warning"
            onClick={() => onDeleteClick(params.row, params.row.id)}
          >
            Delete
          </Button>
        )
      },
    },
  ]

  return (
    <DataGridPremium
      rows={trainings}
      columns={columns}
      pagination
      pageSize={pageSize}
      rowsPerPageOptions={[10, 20, 50, 100]}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      checkboxSelection
      disableSelectionOnClick
      sx={{ height: '75vh' }}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          printOptions: {
            hideToolbar: true,
            hideFooter: true,
          },
        },
      }}
    />
  )
}

export default TrainingsList
