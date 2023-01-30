import Training from 'src/components/Training/Training'

export const QUERY = gql`
  query FindTrainingById($id: Int!) {
    training: training(id: $id) {
      id
      name
      duration
      link
      description
      collections
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Training not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ training }) => {
  return <Training training={training} />
}
