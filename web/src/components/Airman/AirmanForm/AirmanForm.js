import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  SelectField,
} from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

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

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const supervisorsList = data.airmen.filter(
    (airman) => airman.roles === 'Supervisor'
  )
  const monitorsList = data.airmen.filter(
    (airman) => airman.roles === 'Monitor'
  )
  const onSubmit = (data) => {
    props.onSave(data, props?.airman?.id)
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
        <Box display="flex" flexDirection="row">
          <Box width="50%" marginX="5%">
            <Label
              name="rank"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Rank
            </Label>
            <TextField
              name="rank"
              defaultValue={props.airman?.rank}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
            />
            <FieldError name="rank" className="rw-field-error" />

            <Label
              name="lastName"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Last Name
            </Label>
            <TextField
              name="lastName"
              defaultValue={props.airman?.lastName}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
            />
            <FieldError name="lastName" className="rw-field-error" />

            <Label
              name="middleName"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Middle Name
            </Label>
            <TextField
              name="middleName"
              defaultValue={props.airman?.middleName}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
            />
            <FieldError name="middleName" className="rw-field-error" />

            <Label
              name="firstName"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              First Name
            </Label>
            <TextField
              name="firstName"
              defaultValue={props.airman?.firstName}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
            />
            <FieldError name="firstName" className="rw-field-error" />

            <Label
              name="email"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              E-Mail
            </Label>
            <TextField
              name="email"
              defaultValue={props.airman?.email}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
              validation={{ required: true }}
            />
            <FieldError name="email" className="rw-field-error" />
          </Box>
          <Box width="50%" marginX="5%">
            <Label
              name="organization"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Organization
            </Label>
            <TextField
              name="organization"
              defaultValue={props.airman?.organization}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
            />
            <FieldError name="organization" className="rw-field-error" />

            <Label
              name="officeSymbol"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Office Symbol
            </Label>
            <TextField
              name="officeSymbol"
              defaultValue={props.airman?.officeSymbol}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
            />
            <FieldError name="officeSymbol" className="rw-field-error" />

            <Label
              name="roles"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Role
            </Label>
            <SelectField
              name="roles"
              defaultValue={props.airman?.roles || 'Airman'}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
              validation={{ required: true }}
            >
              {rolesList.map((role) => (
                <option
                  key={role}
                  className={mode === 'light' ? 'rw-option' : 'rw-option-dark'}
                  value={role}
                >
                  {role}
                </option>
              ))}
            </SelectField>
            <FieldError name="roles" className="rw-field-error" />

            <Label
              name="supervisorId"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Supervisor
            </Label>
            <SelectField
              name="supervisorId"
              defaultValue={props.airman?.supervisorId}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
              validation={{ valueAsNumber: true }}
            >
              <option
                className={mode === 'light' ? 'rw-option' : 'rw-option-dark'}
                value={undefined}
              />
              {supervisorsList.map((supervisor) => (
                <option
                  key={supervisor.id}
                  className={mode === 'light' ? 'rw-option' : 'rw-option-dark'}
                  value={supervisor.id}
                >
                  {`${supervisor.rank} ${supervisor.lastName}, ${
                    supervisor.firstName
                  } ${supervisor.middleName.charAt(0)} (${
                    supervisor.organization
                  } ${supervisor.officeSymbol})`}
                </option>
              ))}
            </SelectField>
            <FieldError name="supervisorId" className="rw-field-error" />

            <Label
              name="monitorId"
              className={mode === 'light' ? 'rw-label' : 'rw-label-dark'}
              errorClassName="rw-label rw-label-error"
            >
              Monitor
            </Label>
            <SelectField
              name="monitorId"
              defaultValue={props.airman?.monitorId}
              className={mode === 'light' ? 'rw-input' : 'rw-input-dark'}
              errorClassName={
                mode === 'light'
                  ? 'rw-input rw-input-error'
                  : 'rw-input-dark rw-input-error'
              }
              validation={{ valueAsNumber: true }}
            >
              <option
                className={mode === 'light' ? 'rw-option' : 'rw-option-dark'}
                value={undefined}
              />
              {monitorsList.map((monitor) => (
                <option
                  key={monitor.id}
                  className={mode === 'light' ? 'rw-option' : 'rw-option-dark'}
                  value={monitor.id}
                >
                  {`${monitor.rank} ${monitor.lastName}, ${
                    monitor.firstName
                  } ${monitor.middleName.charAt(0)} (${monitor.organization} ${
                    monitor.officeSymbol
                  })`}
                </option>
              ))}
            </SelectField>
            <FieldError name="monitorId" className="rw-field-error" />
          </Box>
        </Box>

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

export default AirmanForm
