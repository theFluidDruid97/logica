import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RoleForm from 'src/components/Role/RoleForm'

import { ThemeModeContext } from '../../../App.js'

export const QUERY = gql`
  query EditRoleById($id: Int!) {
    role: role(id: $id) {
      id
      name
    }
  }
`
const UPDATE_ROLE_MUTATION = gql`
  mutation UpdateRoleMutation($id: Int!, $input: UpdateRoleInput!) {
    updateRole(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ role }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [updateRole, { loading, error }] = useMutation(UPDATE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role updated')
      navigate(routes.roles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateRole({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header
        className={
          mode === 'light' ? 'rw-segment-header' : 'rw-segment-header-dark'
        }
      >
        <h2 className="rw-heading rw-heading-secondary">
          Edit {role.name.charAt(0).toUpperCase() + role.name.slice(1)} Details
        </h2>
      </header>
      <div
        className={
          mode === 'light' ? 'rw-segment-main' : 'rw-segment-main-dark'
        }
      >
        <RoleForm role={role} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
