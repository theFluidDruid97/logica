import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { navigate, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { organizations } from '../../../../../scripts/airmen.js'
import { ranks } from '../../../../../scripts/airmen.js'
import { ThemeModeContext } from '../../../App.js'
import { GeneralContext } from '../../../App.js'

export const QUERY = gql`
  query FindAirmenSelectField {
    airmen {
      id
      email
      rank
      firstName
      middleName
      lastName
      organization
      officeSymbol
      dodId
      roles
    }
  }
`

const AirmanForm = (props) => {
  const { loading, error, data } = useQuery(QUERY)
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const { rolesList } = React.useContext(GeneralContext)
  const [changedValues, setChangedValues] = React.useState({
    rank: false,
    lastName: false,
    firstName: false,
    middleName: false,
    email: false,
    organization: false,
    officeSymbol: false,
    roles: false,
  })
  const [formValues, setFormValues] = React.useState(props.airman)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
    setChangedValues({ ...changedValues, [name]: true })
  }
  const onSubmit = (data) => {
    data.preventDefault()
    if (props.airman === formValues) {
      toast.success(
        `${props.airman.rank} ${props.airman.lastName}, ${props.airman.firstName} updated`
      )
      navigate(routes.airman({ id: props.airman.id }))
    }
    delete formValues.__typename
    delete formValues.id
    props.onSave(formValues, props?.airman?.id)
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <form onSubmit={onSubmit}>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column" width="50%" marginX="5%">
          <FormControl sx={{ marginY: '2.5%' }}>
            <InputLabel>Rank</InputLabel>
            <Select
              name="rank"
              value={changedValues.rank ? formValues.rank : props.airman?.rank}
              label="Rank"
              onChange={handleInputChange}
            >
              {ranks.map((rank) => (
                <MenuItem key={rank} value={rank}>
                  {rank}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ marginY: '2.5%' }}
            name="lastName"
            label="Last Name"
            type="text"
            value={
              changedValues.lastName
                ? formValues.lastName
                : props.airman?.lastName
            }
            onChange={handleInputChange}
          />
          <TextField
            sx={{ marginY: '2.5%' }}
            name="firstName"
            label="First Name"
            type="text"
            value={
              changedValues.firstName
                ? formValues.firstName
                : props.airman?.firstName
            }
            onChange={handleInputChange}
          />
          <TextField
            sx={{ marginY: '2.5%' }}
            name="middleName"
            label="Middle Name"
            type="text"
            value={
              changedValues.middleName
                ? formValues.middleName
                : props.airman?.middleName
            }
            onChange={handleInputChange}
          />
        </Box>
        <Box display="flex" flexDirection="column" width="50%" marginX="5%">
          <TextField
            sx={{ marginY: '2.5%' }}
            name="email"
            label="E-Mail Address"
            type="text"
            value={changedValues.email ? formValues.email : props.airman?.email}
            onChange={handleInputChange}
          />
          <FormControl sx={{ marginY: '2.5%' }}>
            <InputLabel>Organization</InputLabel>
            <Select
              name="organization"
              value={
                changedValues.organization
                  ? formValues.organization
                  : props.airman?.organization
              }
              label="Organization"
              onChange={handleInputChange}
            >
              {organizations.map((organization) => (
                <MenuItem key={organization} value={organization}>
                  {organization}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ marginY: '2.5%' }}
            name="officeSymbol"
            label="Office Symbol"
            type="text"
            value={
              changedValues.officeSymbol
                ? formValues.officeSymbol
                : props.airman?.officeSymbol
            }
            onChange={handleInputChange}
          />
          <FormControl sx={{ marginY: '2.5%' }}>
            <InputLabel>Role</InputLabel>
            <Select
              name="roles"
              value={
                changedValues.roles ? formValues.roles : props.airman?.roles
              }
              label="Role"
              onChange={handleInputChange}
            >
              {rolesList.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <div className="rw-button-group">
        <Button
          variant={mode === 'light' ? 'contained' : 'outlined'}
          type="submit"
          disabled={props.loading}
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default AirmanForm
