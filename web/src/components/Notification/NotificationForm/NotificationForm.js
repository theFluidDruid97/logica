import { Button, FormControl } from '@mui/material'
import ImputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { useQuery } from '@redwoodjs/web'
export const QUERY = gql`
  query FindNotificationAirmen {
    airmen {
      id
      firstName
      lastName
      rank
      email
      middleName
      organization
      officeSymbol
      dodId
      roles
      supervisorId
    }
  }
`
const NotificationForm = (props) => {
  const { data } = useQuery(QUERY)
  const [airman, setAirman] = React.useState()
  const [message, setMessage] = React.useState()
  const onSubmit = (e) => {
    e.preventDefault()
    const airmanId = airman.id
    props.onSave({ airmanId, message })
  }
  const handleRecipientChange = (e) => {
    setAirman(e.target.value)
  }
  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div className="rw-form-wrapper">
      <form onSubmit={onSubmit}>
        <FormControl>
          <ImputLabel>Airman</ImputLabel>
          <Select
            name="recipient"
            value={airman}
            label="Recipient"
            onChange={handleRecipientChange}
          >
            {data?.airmen?.map((airman) => (
              <MenuItem value={airman} key={airman.id}>
                {`${airman.rank}, ${airman.lastName}, ${airman.firstName}`}
              </MenuItem>
            ))}
          </Select>

          <TextField
            name="message"
            label="Message"
            value={props.notification?.message}
            onChange={handleMessageChange}
          />

          <div className="rw-button-group">
            <Button type="submit" disabled={props.loading} variant="contained">
              Save
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  )
}

export default NotificationForm
