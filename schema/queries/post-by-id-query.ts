import { intArg, nonNull, queryField } from "nexus";

export const postByIdQueryField = queryField("postById", {
  type: "Post",
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, { id }, { prisma }) => {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post) return post;
    return null;
  },
});
