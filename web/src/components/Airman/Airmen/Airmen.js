import Button from '@mui/material/Button'
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Airman/AirmenCell'

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
      id
    }
  }
`

const AirmenList = ({ airmen }) => {
  const [deleteAirman] = useMutation(DELETE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success('Airman deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
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

  const columns = [
    { field: 'rank', headerName: 'Rank', flex: 0.5 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'email', headerName: 'E-Mail', flex: 1.25 },
    { field: 'organization', headerName: 'Organization', flex: 1 },
    { field: 'officeSymbol', headerName: 'Office Symbol', flex: 1 },
    { field: 'dodId', headerName: 'DoD ID', flex: 1 },
    { field: 'supervisorId', headerName: 'SID', flex: 0.75 },
    { field: 'monitorId', headerName: 'MID', flex: 0.75 },
    {
      field: 'Show',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => navigate(routes.airman({ id: params.row.id }))}
            color="secondary"
            title={`Show ${params.row.rank} ${params.row.lastName}, ${params.row.firstName} Details`}
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
            onClick={() => navigate(routes.editAirman({ id: params.row.id }))}
            title={`Edit ${params.row.rank} ${params.row.lastName}, ${params.row.firstName} Details`}
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
            title={`Delete ${params.row.rank} ${params.row.lastName}, ${params.row.firstName}`}
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
      rows={airmen}
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

export default AirmenList
