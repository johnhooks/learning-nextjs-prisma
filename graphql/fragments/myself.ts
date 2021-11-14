import gql from "graphql-tag";

export default gql`
  fragment Myself on User {
    id
    email
    name
  }
`;
