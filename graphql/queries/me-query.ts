import gql from "graphql-tag";

import MyselfFragment from "../fragments/myself";

export default gql`
  query Me {
    me {
      ...Myself
    }
    ${MyselfFragment}
  }
`;
