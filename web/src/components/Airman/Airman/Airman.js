//
import { faker } from '@faker-js/faker'
//
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'
//
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
//

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../../App.js'

//
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}
//

const DELETE_AIRMAN_MUTATION = gql`
  mutation DeleteAirmanMutation($id: Int!) {
    deleteAirman(id: $id) {
      id
    }
  }
`

const Airman = ({ airman, airmen }) => {
  const [pageSize, setPageSize] = React.useState(10)
  const supervisor = airmen.find(
    (supervisor) => supervisor.id === airman.supervisorId
  )
  const monitor = airmen.find((monitor) => monitor.id === airman.monitorId)

  const { mode, setMode } = React.useContext(ThemeModeContext)

  const [deleteAirman] = useMutation(DELETE_AIRMAN_MUTATION, {
    onCompleted: () => {
      toast.success('Airman deleted')
      navigate(routes.airmen())
    },
    onError: (error) => {
      toast.error(error.message)
    },
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

  const rows = [{ id: 1 }]
  const columns = [
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'start', headerName: 'Start', flex: 1 },
    { field: 'end', headerName: 'End', flex: 1 },
    { field: 'collection', headerName: 'Collection', flex: 1 },
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
              title={'View'}
            >
              <FindInPageIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              title={'Edit'}
            >
              <EditIcon />
            </Button>
            <Button
              variant={mode === 'light' ? 'contained' : 'outlined'}
              size="small"
              color="error"
              title={'Delete'}
            >
              <DeleteIcon />
            </Button>
          </>
        )
      },
    },
  ]

  let cardBackground
  mode === 'light'
    ? (cardBackground = 'rgba(155, 155, 155, 0.1)')
    : (cardBackground = 'rgba(0, 0, 0, 0.75)')

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box width="80%">
          <Box display="flex" flexDirection="row">
            <Card
              sx={{
                width: '70%',
                marginBottom: '1%',
                backgroundColor: `${cardBackground}`,
                borderLeft: '7px solid',
              }}
            >
              <CardContent>
                <Typography variant="h3">
                  {airman.rank} {airman.lastName}, {airman.firstName}{' '}
                  {airman.middleName}
                </Typography>
                <Divider />
                <Box display="flex" flexDirection="row">
                  <Typography variant="h6" sx={{ margin: '2%' }}>
                    DOD ID
                    <br />
                    {airman.dodId}
                  </Typography>
                  <Typography variant="h6" sx={{ margin: '2%' }}>
                    E-MAIL ADDRESS
                    <br />
                    {airman.email}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: '30%',
                marginBottom: '1%',
                marginX: '1%',
                backgroundColor: `${cardBackground}`,
              }}
            >
              <CardContent>
                <Typography variant="h5">SUPERVISOR</Typography>
                <Divider />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography variant="h7" sx={{ margin: '2%' }}>
                    NAME
                    <br />
                    {supervisor
                      ? `${supervisor.lastName}, ${
                          supervisor.firstName
                        } ${supervisor.middleName.charAt(0)}`
                      : null}
                  </Typography>
                  <Typography variant="h7" sx={{ margin: '2%' }}>
                    RANK
                    <br />
                    {supervisor ? supervisor.rank : null}
                  </Typography>
                </Box>
                <Typography variant="h7" sx={{ margin: '2%' }}>
                  E-MAIL ADDRESS
                  <br />
                  {supervisor ? supervisor.email : null}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box display="flex" flexDirection="row">
            <Card
              sx={{
                width: '70%',
                marginBottom: '1%',
                backgroundColor: `${cardBackground}`,
              }}
            >
              <CardContent>
                <Line options={options} data={data} height={'157px'} />
              </CardContent>
            </Card>
            <Card
              sx={{
                width: '30%',
                marginBottom: '1%',
                marginX: '1%',
                backgroundColor: `${cardBackground}`,
              }}
            >
              <CardContent>
                <Typography variant="h5">TRAINING MONITOR</Typography>
                <Divider />
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography variant="h7" sx={{ margin: '2%' }}>
                    NAME
                    <br />
                    {monitor
                      ? `${monitor.lastName}, ${
                          monitor.firstName
                        } ${monitor.middleName.charAt(0)}`
                      : null}
                  </Typography>
                  <Typography variant="h7" sx={{ margin: '2%' }}>
                    RANK
                    <br />
                    {monitor ? monitor.rank : null}
                  </Typography>
                </Box>
                <Typography variant="h7" sx={{ margin: '2%' }}>
                  E-MAIL ADDRESS
                  <br />
                  {monitor ? monitor.email : null}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box width="20%" marginBottom="0.8%">
          <Card sx={{ height: '100%', backgroundColor: `${cardBackground}` }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5">ORGANIZATION</Typography>
              <Divider />
              <Typography variant="h7" sx={{ margin: '2%' }}>
                <br />
                AFGSC
                <br />|
                <br />2 AF
                <br />|
                <br />
                377 ABW
                <br />|
                <br />
                377 SFG
                <br />|
                <br />
                377 SFS
                <br />|
                <br />
                {airman.organization}
                <br />|
                <br />
                {airman.officeSymbol}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <DataGridPremium
        rows={rows}
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
      <nav className="rw-button-group">
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={() => navigate(routes.editAirman({ id: airman.id }))}
        >
          Edit
        </Button>
        <Button
          sx={{ marginX: 1 }}
          variant={mode === 'light' ? 'contained' : 'outlined'}
          color="error"
          onClick={() => onDeleteClick(airman, airman.id)}
        >
          Delete
        </Button>
      </nav>
    </>
  )
  // return (
  //   <>
  //     <div className="rw-segment">
  //       <header
  //         className={
  //           mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
  //         }
  //       >
  //         <h2 className="rw-heading rw-heading-secondary">
  //           {airman.rank} {airman.lastName}, {airman.firstName}
  //         </h2>
  //       </header>
  //       <table className={mode === 'light' ? 'rw-table' : 'rw-table-dark'}>
  //         <tbody>
  //           <tr>
  //             <th>ID</th>
  //             <td>{airman.id}</td>
  //           </tr>
  //           <tr>
  //             <th>E-Mail</th>
  //             <td>{airman.email}</td>
  //           </tr>
  //           <tr>
  //             <th>Rank</th>
  //             <td>{airman.rank}</td>
  //           </tr>
  //           <tr>
  //             <th>First Name</th>
  //             <td>{airman.firstName}</td>
  //           </tr>
  //           <tr>
  //             <th>Middle Name</th>
  //             <td>{airman.middleName}</td>
  //           </tr>
  //           <tr>
  //             <th>Last Name</th>
  //             <td>{airman.lastName}</td>
  //           </tr>
  //           <tr>
  //             <th>Organization</th>
  //             <td>{airman.organization}</td>
  //           </tr>
  //           <tr>
  //             <th>Office Symbol</th>
  //             <td>{airman.officeSymbol}</td>
  //           </tr>
  //           <tr>
  //             <th>DoD ID</th>
  //             <td>{airman.dodId}</td>
  //           </tr>
  //           <tr>
  //             <th>Role</th>
  //             <td>{airman.roles}</td>
  //           </tr>
  //           <tr>
  //             <th>Supervisor</th>
  //             <td>
  //               {supervisor
  //                 ? `${supervisor.rank} ${supervisor.lastName}, ${
  //                     supervisor.firstName
  //                   } ${supervisor.middleName.charAt(0)} (${
  //                     supervisor.organization
  //                   } ${supervisor.officeSymbol})`
  //                 : null}
  //             </td>
  //           </tr>
  //           <tr>
  //             <th>Monitor</th>
  //             <td>
  //               {monitor
  //                 ? `${monitor.rank} ${monitor.lastName}, ${
  //                     monitor.firstName
  //                   } ${monitor.middleName.charAt(0)} (${
  //                     monitor.organization
  //                   } ${monitor.officeSymbol})`
  //                 : null}
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //     <nav className="rw-button-group">
  //       <Button
  //         sx={{ marginX: 1 }}
  //         variant={mode === 'light' ? 'contained' : 'outlined'}
  //         onClick={() => navigate(routes.editAirman({ id: airman.id }))}
  //       >
  //         Edit
  //       </Button>
  //       <Button
  //         sx={{ marginX: 1 }}
  //         variant={mode === 'light' ? 'contained' : 'outlined'}
  //         color="error"
  //         onClick={() => onDeleteClick(airman, airman.id)}
  //       >
  //         Delete
  //       </Button>
  //     </nav>
  //   </>
  // )
}

export default Airman
