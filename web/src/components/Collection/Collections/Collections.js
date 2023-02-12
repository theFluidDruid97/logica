import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Button from '@mui/material/Button'
import {
  useGridApiRef,
  // useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium'

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
  const { mode } = React.useContext(ThemeModeContext)
  const apiRef = useGridApiRef()

  // const initialState = useKeepGroupedColumnsHidden({
  //   apiRef,
  //   initialState: {
  //     ...collections.initialState,
  //     rowGrouping: {
  //       ...collections.initialState?.rowGrouping,
  //       model: ['name'],
  //     },
  //     sorting: {
  //       sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
  //     },
  //   },
  // })

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
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 250 },
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
              onClick={() => navigate(routes.collection({ id: params.row.id }))}
              title={'View'}
            >
              <FindInPageIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={() =>
                navigate(routes.editCollection({ id: params.row.id }))
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

  return (
    <DataTable
      rows={collections}
      columns={columns}
      apiRef={apiRef}
      initialState={{
        rowGrouping: {
          model: ['name'],
        },
      }}
    />
  )
}

export default CollectionsList
