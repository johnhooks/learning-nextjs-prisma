import gql from "graphql-tag";

import PostDetailFragment from "../fragments/post-detail";

export default gql`
  query FilterPosts($searchString: String) {
    filterPosts(searchString: $searchString) {
      ...PostDetail
    }
    ${PostDetailFragment}
  }
`;
