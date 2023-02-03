import Button from '@mui/material/Button'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Collection/CollectionsCell'

import { ThemeModeContext } from '../../../App.js'
import DataTable from '../../DataTable/DataTable.js'

const DELETE_COLLECTION_MUTATION = gql`
  mutation DeleteCollectionMutation($id: Int!) {
    deleteCollection(id: $id) {
      id
    }
  }
`

const CollectionsList = ({ collections }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
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
              onClick={() => navigate(routes.collection({ id: params.row.id }))}
              title={`Show ${params.row.name} Details`}
            >
              Show
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={() =>
                navigate(routes.editCollection({ id: params.row.id }))
              }
              title={`Edit ${params.row.name} Details`}
            >
              Edit
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color="error"
              onClick={() => onDeleteClick(params.row, params.row.id)}
              title={`Delete ${params.row.name}`}
            >
              Delete
            </Button>
          </>
        )
      },
    },
  ]

  return <DataTable rows={collections} columns={columns} />
}

export default CollectionsList
