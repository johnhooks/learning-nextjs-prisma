import gql from "graphql-tag";

export default gql`
  fragment PostDetail on Post {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
`;
