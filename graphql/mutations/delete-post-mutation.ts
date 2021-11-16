import gql from "graphql-tag";

export default gql`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
