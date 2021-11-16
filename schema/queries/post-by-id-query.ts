import { intArg, nonNull, queryField } from "nexus";

export const postByIdQueryField = queryField("postById", {
  type: "Post",
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, { id }, { prisma }) => {
    await prisma.post.findUnique({
      where: { id },
    });
    return null;
  },
});
