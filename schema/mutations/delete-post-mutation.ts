import { intArg, nonNull, mutationField } from "nexus";

export const deletePostMutationField = mutationField("deletePost", {
  type: "Post",
  args: {
    postId: nonNull(intArg()),
  },
  resolve: (_, { postId }, { prisma }) => {
    return prisma.post.delete({
      where: { id: postId },
    });
  },
});
