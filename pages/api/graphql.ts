import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import { RequestHandler } from "micro";
import cors from "micro-cors";

import type { Context } from "../../lib/context";
import { schema } from "../../schema";
import prisma from "../../lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }): Context => {
    return {
      req,
      res,
      prisma,
    };
  },
});

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: "/api/graphql",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export default cors()(handler as RequestHandler);
