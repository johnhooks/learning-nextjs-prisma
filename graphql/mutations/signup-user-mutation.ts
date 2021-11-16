import gql from "graphql-tag";

import MyselfFragment from "../fragments/myself";

export default gql`
  mutation SignupUser($data: SignupUserInput!) {
    signupUser(data: $data) {
      ...Myself
    }
    ${MyselfFragment}
  }
`;
