import Button from '@mui/material/Button'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_ROLE_MUTATION = gql`
  mutation DeleteRoleMutation($id: Int!) {
    deleteRole(id: $id) {
      id
    }
  }
`

const Role = ({ role }) => {
  const [deleteRole] = useMutation(DELETE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role deleted')
      navigate(routes.roles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (
      confirm(
        `Are you sure you want to delete ${
          role.name.charAt(0).toUpperCase() + role.name.slice(1)
        } role?`
      )
    ) {
      deleteRole({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            {role.name.charAt(0).toUpperCase() + role.name.slice(1)} Details
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{role.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{role.name.charAt(0).toUpperCase() + role.name.slice(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Button onClick={() => navigate(routes.editRole({ id: role.id }))}>
          Edit
        </Button>
        <Button color="warning" onClick={() => onDeleteClick(role.id)}>
          Delete
        </Button>
      </nav>
    </>
  )
}

export default Role
