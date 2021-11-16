import gql from "graphql-tag";

import PostDetail from "../fragments/post-detail.js";

export default gql`
  mutation CreateDraft($data: CreateDraftInput!) {
    createDraft(data: $data) {
      ...PostDetail
    }
    ${PostDetail}
  }
`;
