import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { FeedQuery, FeedDocument, useFeedQuery } from "generated/client-codegen";
import { createApolloClientSSR, addApolloState } from "lib/apollo-client-ssr";
import Post from "components/post";

const HomePage: NextPage = () => {
  const { loading, error, data } = useFeedQuery({
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
      <Head>
        <title>Learning Next</title>
        <meta name="description" content="Learning Next.js, GraphQL, and Prisma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <div className="page">
        <h1>My Blog</h1>
        <main>
          {data.feed.map(post => (
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

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = createApolloClientSSR();

  await apolloClient.query<FeedQuery>({
    query: FeedDocument,
  });

  return addApolloState(apolloClient);
};
