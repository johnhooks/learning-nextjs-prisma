import { list, nonNull, queryField } from "nexus";

export const draftsQueryField = queryField("drafts", {
  type: nonNull(list(nonNull("Post"))),
  resolve: (_parent, _args, { prisma }) => {
    return prisma.post.findMany({
      where: { published: false },
    });
  },
});
