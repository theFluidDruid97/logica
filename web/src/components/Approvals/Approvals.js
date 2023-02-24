import * as React from 'react'

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import { Box} from '@mui/material'
//import Button from '@mui/material/Button'
import { green, red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'

import { ThemeModeContext } from 'src/App.js'

const Approvals = () => {
  const { mode } = React.useContext(ThemeModeContext)
  const onDenyClick = () => {
    if (confirm(`Are you sure you want to deny this training?`)) {
      console.log('will delete request, and notify user')
    }
  }
  const onApproveClick = () => {
    if (confirm(`Are you sure you want to approve this training?`)) {
      console.log(
        'approve will approve request, delete listing and add to training list w/notification'
      )
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 50, flex: 0.25 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 130,
      flex: 0.5,
    },
    { field: 'lastName', headerName: 'Last name', width: 100, flex: 0.75 },
    {
      field: 'training',
      headerName: 'Training',
      type: 'string',
      width: 300,
      flex: 0.75,
    },
    {
      field: 'trainingStatus',
      headerName: 'Training Status',
      type: 'string',
      width: 200,
      flex: 0.75,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      flex: 1,
      renderCell: (params) => {
        // const { mode } = React.useContext(ThemeModeContext)
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                marginRight: 1,
              }}
            >
              <IconButton
                variant={mode === 'light' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => onDenyClick(params.row, params.row.id)}
                title={'Deny'}
                sx={{
                  borderColor: red[500],
                  color: red[500],
                }}
              >
                <DoDisturbIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                variant={mode === 'light' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => onApproveClick(params.row, params.row.id)}
                title={'Approve'}
                sx={{
                  borderColor: green[500],
                  color: green[500],
                }}
              >
                <CheckOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        )
      },
    },
  ]

  const rows = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      training: 'Aircraft Familiarization',
      trainingStatus: 'incomplete',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      training: 'Aircraft Familiarization',
      trainingStatus: 'incomplete',
    },
    {
      id: 3,
      firstName: 'Jimmmy',
      lastName: 'Doe',
      training: 'Aircraft Familiarization',
      trainingStatus: 'incomplete',
    },
  ]
  return (
    <Box alignContent={'center'}>
      {/* <Typography marginLeft={'35%'} marginRight={'35%'} fontFamily={'Oxygen'}>
        <h1>Training Requests</h1>
      </Typography> */}
      <Box
        style={{
          height: 600,
          width: '90%',
          marginLeft: '5%',
          marginRight: '5%',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </Box>
  )
}

export default Approvals
