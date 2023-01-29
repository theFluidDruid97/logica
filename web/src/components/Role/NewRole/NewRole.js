import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RoleForm from 'src/components/Role/RoleForm'

import { ThemeModeContext } from '../../../App.js'

const CREATE_ROLE_MUTATION = gql`
  mutation CreateRoleMutation($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
    }
  }
`

const NewRole = () => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [createRole, { loading, error }] = useMutation(CREATE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role created')
      navigate(routes.roles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createRole({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header
        className={
          mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
        }
      >
        <h2 className="rw-heading rw-heading-secondary">New Role</h2>
      </header>
      <div
        className={
          mode === 'light' ? 'rw-segment-main' : 'rw-segment-main-dark'
        }
      >
        <RoleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRole
