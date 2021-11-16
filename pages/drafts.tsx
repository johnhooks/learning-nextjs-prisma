import type { GetServerSideProps, NextPage } from "next";

import { DraftsQuery, DraftsDocument, useDraftsQuery } from "generated/client-codegen";
import { createApolloClientSSR, addApolloState } from "lib/apollo-client-ssr";
import Post from "components/post";

const DraftsPage: NextPage = () => {
  const { loading, error, data } = useDraftsQuery({
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {data.drafts.map(post => (
            <div key={post.id} className="post">
              <Post {...post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default DraftsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = createApolloClientSSR();

  await apolloClient.query<DraftsQuery>({
    query: DraftsDocument,
  });

  return addApolloState(apolloClient);
};
