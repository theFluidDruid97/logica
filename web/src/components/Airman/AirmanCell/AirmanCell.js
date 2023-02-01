import Airman from 'src/components/Airman/Airman'

export const QUERY = gql`
  query FindAirmanById($id: Int!) {
    airman: airman(id: $id) {
      id
      email
      hashedPassword
      salt
      rank
      firstName
      middleName
      lastName
      organization
      officeSymbol
      dodId
      resetToken
      resetTokenExpiresAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Airman not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ airman }) => {
  return <Airman airman={airman} />
}
