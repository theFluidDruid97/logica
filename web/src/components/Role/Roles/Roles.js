import Button from '@mui/material/Button'
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Role/RolesCell'

const DELETE_ROLE_MUTATION = gql`
  mutation DeleteRoleMutation($id: Int!) {
    deleteRole(id: $id) {
      id
    }
  }
`

const RolesList = ({ roles }) => {
  const [pageSize, setPageSize] = React.useState()
  const [deleteRole] = useMutation(DELETE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (role, id) => {
    if (
      confirm(
        `Are you sure you want to delete the ${
          role.name.charAt(0).toUpperCase() + role.name.slice(1)
        } role?`
      )
    ) {
      deleteRole({ variables: { id } })
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.25 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'Show',
      headerName: '',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => navigate(routes.role({ id: params.row.id }))}
            color="secondary"
            title={`Show ${
              params.row.name.charAt(0).toUpperCase() + params.row.name.slice(1)
            } Details`}
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
            onClick={() => navigate(routes.editRole({ id: params.row.id }))}
            title={`Edit ${
              params.row.name.charAt(0).toUpperCase() + params.row.name.slice(1)
            } Details`}
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
            title={`Delete ${
              params.row.name.charAt(0).toUpperCase() + params.row.name.slice(1)
            }`}
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
      rows={roles}
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

export default RolesList
