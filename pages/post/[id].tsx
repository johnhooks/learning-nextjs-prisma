import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import {
  PostByIdQuery,
  PostByIdDocument,
  usePostByIdQuery,
  useDeletePostMutation,
  usePublishMutation,
} from "generated/client-codegen";
import { createApolloClientSSR, addApolloState } from "lib/apollo-client-ssr";

const PostPage: NextPage = () => {
  const postId = parseInt(useRouter().query.id as string);

  const router = useRouter();
  const [publish] = usePublishMutation();
  const [deletePost] = useDeletePostMutation();
  const { loading, error, data } = usePostByIdQuery({
    variables: { id: postId },
  });

  if (error) {
    console.log("error");
    return <div>Error: {error.message}</div>;
  }

  if (!data?.postById || loading) {
    console.log("loading");
    return <div>Loading ...</div>;
  }

  let { title } = data.postById;
  const post = data.postById;

  console.log(`response`, data);
  if (!data.postById.published) {
    title = `${title} (Draft)`;
  }

  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <>
      <div>
        <h2>{title}</h2>
        <p>By {authorName}</p>
        <p>{post.content}</p>
        {!post.published && (
          <button
            onClick={async () => {
              await publish({
                variables: {
                  postId,
                },
              });
              router.push("/");
            }}
          >
            Publish
          </button>
        )}
        <button
          onClick={async () => {
            await deletePost({
              variables: {
                postId,
              },
            });
            router.push("/");
          }}
        >
          Delete
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = parseInt(params?.id as string);

  if (isNaN(postId)) {
    return {
      notFound: true,
    };
  }

  const apolloClient = createApolloClientSSR();

  await apolloClient.query<PostByIdQuery>({
    query: PostByIdDocument,
    variables: { id: postId },
  });

  return addApolloState(apolloClient);
};
