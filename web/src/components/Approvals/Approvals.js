import * as React from 'react'

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import { Box } from '@mui/material'
import { green, red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'

import { useMutation } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { Toast } from '@redwoodjs/web/dist/toast'

import { ThemeModeContext } from 'src/App.js'

export const QUERY = gql`
  query FindAirmanTrainings {
    airmanTrainings {
      id
      approval
      airman {
        id
        firstName
        lastName
        rank
      }
      training {
        id
        name
      }
    }
  }
`
const DELETE_AIRMAN_TRAINING_MUTATION = gql`
  mutation DeleteAirmanTrainingMutation($id: Int!) {
    deleteAirmanTraining(id: $id) {
      id
    }
  }
`

const UPDATE_AIRMAN_TRAINING_MUTATION = gql`
  mutation UpdateAirmanTrainingMutation(
    $id: Int!
    $input: UpdateAirmanTrainingInput!
  ) {
    updateAirmanTraining(id: $id, input: $input) {
      approval
    }
  }
`

const Approvals = () => {
  const { data } = useQuery(QUERY)
  const { mode } = React.useContext(ThemeModeContext)
  const [updateAirmanTraining] = useMutation(UPDATE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      Toast.success('Training Updated')
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const [deleteAirmanTraining] = useMutation(DELETE_AIRMAN_TRAINING_MUTATION, {
    onCompleted: () => {
      Toast.success('Training Deleted')
    },
  })
  const unapprovedAirmanTrainings = data?.airmanTrainings.filter(
    (airmanTraining) => airmanTraining.approval === false
  )
  console.log(unapprovedAirmanTrainings)
  const handleUpdateAirmanTraining = (id, input) => {
    updateAirmanTraining({
      variables: {
        id,
        input,
      },
    })
  }
  const handleDeleteAirmanTraining = (id) => {
    deleteAirmanTraining({
      variables: {
        id,
      },
    })
  }

  const onApproveClick = (airmanTraining, id) => {
    if (confirm('Are you sure you want to approve this training?')) {
      handleUpdateAirmanTraining(id, { approval: true })
    }
  }
  const onDenyClick = (airmanTraining, id) => {
    if (confirm('Are you sure you want to deny this training?')) {
      handleDeleteAirmanTraining(id)
    }
  }
  console.log(data)
  const getRows = () => {
    unapprovedAirmanTrainings?.map((airmanTraining) => {
      const approval = airmanTraining.approval
      const rank = airmanTraining.airman.rank
      const firstName = airmanTraining.airman.firstName
      const lastName = airmanTraining.airman.lastName
      const training = airmanTraining.training.name
      const id = airmanTraining.id
      rows.push({
        id: id,
        rank: rank,
        firstName: firstName,
        lastName: lastName,
        training: training,
        approval: approval,
      })
    })
  }
  const rows = []
  getRows()

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, flex: 0.25 },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 130,
      flex: 0.5,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 130,
      flex: 0.5,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 130,
      flex: 0.5,
    },
    {
      field: 'training',
      headerName: 'Training',
      type: 'string',
      width: 300,
      flex: 0.75,
    },
    {
      field: 'approval',
      headerName: 'Approval',
      width: 150,
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      flex: 1,
      renderCell: (params) => {
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

  console.log(rows)
  return (
    <Box alignContent={'center'}>
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
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </Box>
  )
}

export default Approvals
