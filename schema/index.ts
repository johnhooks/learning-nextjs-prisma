import { makeSchema } from "nexus";
import path from "path";

import * as types from "./types";
import * as queries from "./queries";
import * as mutations from "./mutations";

export const schema = makeSchema({
  types: { ...types, ...queries, ...mutations },
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "schema.graphql"),
  },
  contextType: {
    module: path.join(process.cwd(), "lib/context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  prettierConfig: path.join(process.cwd(), ".prettierrc"),
});
