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
  query FindAirmen {
    airmen {
      id
      lastName
      firstName
      rank
      email
      middleName
      organization
      officeSymbol
      dodId
      roles
      afsc
      supervisorId
    }
  }
`
const NotificationListForm = (props) => {
  const { data, loading, error } = useQuery(QUERY)
  const { airman, setAirman } = React.useState('')
  const onSubmit = (data) => {
    props.onSave(data, props?.notificationList?.id)
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
        <ImputLabel id="demo-simple-select-label">Airmen</ImputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={airman}
          label="recipient"
        >
          {data?.airmen?.map((airman) => (
            <MenuItem
              value={airman.id}
              key={airman}
            >{`${airman.rank}, ${airman.lastname}, ${airman.firstname}`}</MenuItem>
          ))}
        </Select>

        <Label
          name="airmanId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Airman id
        </Label>

        <NumberField
          name="airmanId"
          defaultValue={props.notificationList?.airmanId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="airmanId" className="rw-field-error" />

        <Label
          name="messsage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Messsage
        </Label>

        <TextField
          name="messsage"
          defaultValue={props.notificationList?.messsage}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="messsage" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default NotificationListForm
