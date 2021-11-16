import { arg, nonNull, mutationField } from "nexus";

export const createDraftMutationField = mutationField("createDraft", {
  type: "Post",
  args: {
    data: nonNull(
      arg({
        type: "CreateDraftInput",
      })
    ),
  },
  resolve: (_, { data: { title, content, authorEmail } }, { prisma }) => {
    return prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  },
});
