import ImputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'
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
  const { airmen } = React.useState('')
  const onSubmit = (data) => {
    props.onSave(data, props?.notification?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <ImputLabel id="demo-simple-select-label">Airman</ImputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={airmen}
          label="recipient"
        >
          {data?.airmen?.map((airman) => (
            <MenuItem value={airman} key={airman.id}>
              {`${airman.rank}, ${airman.lastName}, ${airman.firstName}`}
            </MenuItem>
          ))}
        </Select>

        <Label
          name="airmanId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Airman id
        </Label>

        {/* <NumberField
          name="airmanId"
          defaultValue={props.notification?.airmanId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          // validation={{ required: true }}
        /> */}

        <FieldError name="airmanId" className="rw-field-error" />

        <Label
          name="message"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message
        </Label>

        <TextField
          name="message"
          defaultValue={props.notification?.message}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="message" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default NotificationForm
