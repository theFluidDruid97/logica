import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../../App.js'

const TrainingForm = (props) => {
  const { mode } = React.useContext(ThemeModeContext)
  const [changedValues, setChangedValues] = React.useState({
    name: false,
    duration: false,
    link: false,
    description: false,
  })
  const [formValues, setFormValues] = React.useState(props.training)

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
    if (props.training === formValues) {
      toast.success(`${props.training.name} updated`)
      navigate(routes.training({ id: props.training.id }))
    }
    formValues.duration = parseInt(formValues.duration)
    delete formValues.__typename
    delete formValues.id
    props.onSave(formValues, props?.training?.id)
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        sx={{ margin: '2%', width: '46%' }}
        name="name"
        label="Name"
        type="text"
        value={changedValues.name ? formValues.name : props.training.name}
        onChange={handleInputChange}
      />
      <TextField
        sx={{ margin: '2%', width: '46%' }}
        name="duration"
        label="Duration"
        type="text"
        value={
          changedValues.duration ? formValues.duration : props.training.duration
        }
        onChange={handleInputChange}
      />
      <TextField
        sx={{ margin: '2%', width: '96%' }}
        name="link"
        label="Link"
        type="text"
        value={changedValues.link ? formValues.link : props.training.link}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        multiline
        sx={{ margin: '2%', width: '96%' }}
        name="description"
        label="Description"
        type="text"
        value={
          changedValues.description
            ? formValues.description
            : props.training.description
        }
        onChange={handleInputChange}
      />
      <div className="rw-button-group">
        <Button
          sx={{ margin: '1%' }}
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

export default TrainingForm
