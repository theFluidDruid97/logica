import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Airman/AirmenCell'

import { ThemeModeContext } from '../../../App.js'
import DataTable from '../../DataTable/DataTable.js'

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
      id
    }
  }
`

const AirmenList = ({ airmen }) => {
  const { mode } = React.useContext(ThemeModeContext)
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
    {
      field: 'status',
      headerName: 'Status',
      width: 125,
      renderCell: (params) => {
        if (params.row.status === 'Overdue') {
          return (
            <Chip
              sx={{ width: '95px' }}
              label="OVERDUE"
              color="red"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        } else if (params.row.status === 'Due') {
          return (
            <Chip
              sx={{ width: '95px' }}
              label="DUE"
              color="yellow"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        } else {
          return (
            <Chip
              sx={{ width: '95px' }}
              label="CURRENT"
              color="green"
              variant={mode === 'light' ? 'contained' : 'outlined'}
            />
          )
        }
      },
    },
    { field: 'rank', headerName: 'Rank', flex: 0.75 },
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
      width: 225,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color={mode === 'light' ? 'grey' : 'primary'}
              onClick={() => navigate(routes.airman({ id: params.row.id }))}
              title={'View'}
            >
              <FindInPageIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => navigate(routes.editAirman({ id: params.row.id }))}
              title={'Edit'}
            >
              <EditIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color={mode === 'light' ? 'red' : 'primary'}
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

  return <DataTable rows={airmen} columns={columns} />
}

export default AirmenList
