import gql from "graphql-tag";

import PostDetail from "../fragments/post-detail.js";

export default gql`
  mutation Publish($postId: Int!) {
    publish(postId: $postId) {
      ...PostDetail
    }
    ${PostDetail}
  }
`;
