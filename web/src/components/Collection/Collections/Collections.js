import Button from '@mui/material/Button'
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Collection/CollectionsCell'

const DELETE_COLLECTION_MUTATION = gql`
  mutation DeleteCollectionMutation($id: Int!) {
    deleteCollection(id: $id) {
      id
    }
  }
`

const CollectionsList = ({ collections }) => {
  const [deleteCollection] = useMutation(DELETE_COLLECTION_MUTATION, {
    onCompleted: () => {
      toast.success('Collection deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (collection, id) => {
    if (confirm(`Are you sure you want to delete ${collection.name}?`)) {
      deleteCollection({ variables: { id } })
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'Show',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => navigate(routes.collection({ id: params.row.id }))}
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
            onClick={() =>
              navigate(routes.editCollection({ id: params.row.id }))
            }
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
      rows={collections}
      columns={columns}
      pageSize={5}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          printOptions: {
            hideToolbar: true,
            hideFooter: true,
            pageStyle:
              '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0); }',
          },
        },
      }}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
      sx={{ height: '75vh' }}
    />
  )
}

export default CollectionsList
