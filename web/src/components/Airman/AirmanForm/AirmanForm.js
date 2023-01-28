import Button from '@mui/material/Button'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const AirmanForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.airman?.id)
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

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          E-Mail
        </Label>

        <TextField
          name="email"
          defaultValue={props.airman?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="hashedPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hashed Password
        </Label>

        <TextField
          name="hashedPassword"
          defaultValue={props.airman?.hashedPassword}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="hashedPassword" className="rw-field-error" />

        <Label
          name="salt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Salt
        </Label>

        <TextField
          name="salt"
          defaultValue={props.airman?.salt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="salt" className="rw-field-error" />

        <Label
          name="firstName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          First Name
        </Label>

        <TextField
          name="firstName"
          defaultValue={props.airman?.firstName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="firstName" className="rw-field-error" />

        <Label
          name="middleName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Middle Name
        </Label>

        <TextField
          name="middleName"
          defaultValue={props.airman?.middleName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="middleName" className="rw-field-error" />

        <Label
          name="lastName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last Name
        </Label>

        <TextField
          name="lastName"
          defaultValue={props.airman?.lastName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="lastName" className="rw-field-error" />

        <Label
          name="organization"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organization
        </Label>

        <TextField
          name="organization"
          defaultValue={props.airman?.organization}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="organization" className="rw-field-error" />

        <Label
          name="dodId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          DoD ID
        </Label>

        <TextField
          name="dodId"
          defaultValue={props.airman?.dodId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="dodId" className="rw-field-error" />

        <Label
          name="rank"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rank
        </Label>

        <TextField
          name="rank"
          defaultValue={props.airman?.rank}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="rank" className="rw-field-error" />

        <Label
          name="officeSymbol"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Office Symbol
        </Label>

        <TextField
          name="officeSymbol"
          defaultValue={props.airman?.officeSymbol}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="officeSymbol" className="rw-field-error" />

        <Label
          name="roles"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Roles
        </Label>

        <TextField
          name="roles"
          defaultValue={props.airman?.roles}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="roles" className="rw-field-error" />

        <Label
          name="resetToken"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Reset Token
        </Label>

        <TextField
          name="resetToken"
          defaultValue={props.airman?.resetToken}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="resetToken" className="rw-field-error" />

        <Label
          name="resetTokenExpiresAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Reset Token Expiration
        </Label>

        <DatetimeLocalField
          name="resetTokenExpiresAt"
          defaultValue={formatDatetime(props.airman?.resetTokenExpiresAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="resetTokenExpiresAt" className="rw-field-error" />

        <Label
          name="supervisorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Supervisor ID
        </Label>

        <NumberField
          name="supervisorId"
          defaultValue={props.airman?.supervisorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="supervisorId" className="rw-field-error" />

        <Label
          name="monitorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Monitor ID
        </Label>

        <NumberField
          name="monitorId"
          defaultValue={props.airman?.monitorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="monitorId" className="rw-field-error" />

        <div className="rw-button-group">
          <Button type="submit" disabled={props.loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AirmanForm
