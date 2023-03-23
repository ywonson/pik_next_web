import { gql, useQuery } from '@apollo/client'


const GET_num = gql`
query NumRows{
  pik_test_aggregate {
    aggregate {
      count
    }
  }
}`

export function UserNum() {
  
  const { loading, error, data } = useQuery(GET_num, { fetchPolicy: "no-cache",})
  if (error) {
    return -1;
  }
  if (loading) {
    return 200;
  }
  return parseInt(data.pik_test_aggregate.aggregate.count);}