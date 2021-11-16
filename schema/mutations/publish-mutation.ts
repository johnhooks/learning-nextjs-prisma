import { intArg, nonNull, mutationField } from "nexus";

export const publishMutationField = mutationField("publish", {
  type: "Post",
  args: {
    postId: nonNull(intArg()),
  },
  resolve: async (_, { postId }, { prisma }) => {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });

    if (post) return post;

    throw new Error(`Failed to publish post id: ${postId}, resource not found`);
  },
});
