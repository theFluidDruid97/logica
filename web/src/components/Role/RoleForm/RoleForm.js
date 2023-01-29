import Button from '@mui/material/Button'

import { Form, FormError, FieldError, Label, TextField } from '@redwoodjs/forms'

import { ThemeModeContext } from '../../../App.js'

const RoleForm = (props) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const onSubmit = (data) => {
    props.onSave(data, props?.role?.id)
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
          name="name"
          className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.role?.name}
          className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Button type="submit" disabled={props.loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default RoleForm
