import gql from "graphql-tag";

import PostDetailFragment from "../fragments/post-detail";

export default gql`
  query PostById($id: Int!) {
    postById(id: $id) {
      ...PostDetail
    }
    ${PostDetailFragment}
  }
`;
