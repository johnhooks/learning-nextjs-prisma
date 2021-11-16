import gql from "graphql-tag";

import PostDetailFragment from "../fragments/post-detail";

export default gql`
  query Drafts {
    drafts {
      ...PostDetail
    }
    ${PostDetailFragment}
  }
`;
