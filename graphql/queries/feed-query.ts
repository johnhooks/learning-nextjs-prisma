import gql from "graphql-tag";

import PostDetailFragment from "../fragments/post-detail";

export default gql`
  query Feed {
    feed {
      ...PostDetail
    }
    ${PostDetailFragment}
  }
`;
