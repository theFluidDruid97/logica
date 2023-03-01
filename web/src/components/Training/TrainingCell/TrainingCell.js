import Training from 'src/components/Training/Training'

export const QUERY = gql`
  query FindTrainingById($id: Int!) {
    training: training(id: $id) {
      id
      name
      duration
      link
      description
    }
    airmanTrainings {
      id
      trainingId
      airmanId
      status
      start
      end
    }
    airmen {
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
      roles
      afsc
      status
      supervisorId
    }
    certificates {
      id
      airmanId
      trainingId
      completion
      validated
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Training not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  training,
  airmanTrainings,
  airmen,
  certificates,
}) => {
  return (
    <Training
      training={training}
      airmanTrainings={airmanTrainings}
      airmen={airmen}
      certificates={certificates}
    />
  )
}
