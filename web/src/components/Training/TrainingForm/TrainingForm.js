import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
} from '@redwoodjs/forms'

import { ThemeModeContext } from '../../../App.js'

const TrainingForm = (props) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const onSubmit = (data) => {
    console.log(data)
    props.onSave(data, props?.training?.id)
  }

  return (
    <Box className="rw-form-wrapper">
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
          defaultValue={props.training?.name}
          className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
          errorClassName={
            mode === 'light'
              ? 'rw-input rw-input-error'
              : 'rw-input-dark rw-input-error'
          }
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />
        <Label
          name="duration"
          className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
          errorClassName="rw-label rw-label-error"
        >
          Duration
        </Label>
        <NumberField
          name="duration"
          defaultValue={props.training?.duration}
          className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
          errorClassName={
            mode === 'light'
              ? 'rw-input rw-input-error'
              : 'rw-input-dark rw-input-error'
          }
          validation={{ required: true }}
        />
        <FieldError name="duration" className="rw-field-error" />
        <Label
          name="link"
          className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
          errorClassName="rw-label rw-label-error"
        >
          Link
        </Label>
        <TextField
          name="link"
          defaultValue={props.training?.link}
          className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
          errorClassName={
            mode === 'light'
              ? 'rw-input rw-input-error'
              : 'rw-input-dark rw-input-error'
          }
        />
        <FieldError name="link" className="rw-field-error" />
        <Label
          name="description"
          className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        <TextField
          name="description"
          defaultValue={props.training?.description}
          className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
          errorClassName={
            mode === 'light'
              ? 'rw-input rw-input-error'
              : 'rw-input-dark rw-input-error'
          }
        />
        <FieldError name="description" className="rw-field-error" />
        <div className="rw-button-group">
          <Button
            sx={{ marginX: 1 }}
            variant={mode === 'light' ? 'contained' : 'outlined'}
            type="submit"
            disabled={props.loading}
          >
            Save
          </Button>
        </div>
      </Form>
    </Box>
  )
}

export default TrainingForm
