import Airman from 'src/components/Airman/Airman'

export const QUERY = gql`
  query FindAirmanById($id: Int!) {
    airman: airman(id: $id) {
      id
      email
      rank
      firstName
      middleName
      lastName
      organization
      officeSymbol
      dodId
      afsc
      roles
      supervisorId
    }
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
      afsc
      roles
      supervisorId
    }
    trainings {
      id
      name
      duration
      link
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Airman not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ airman, airmen, trainings }) => {
  return <Airman airman={airman} airmen={airmen} trainings={trainings} />
}
