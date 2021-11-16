import { inputObjectType, objectType } from "nexus";

import { Post } from "nexus-prisma";

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.field(Post.id);
    t.field(Post.title);
    t.field(Post.content);
    t.field(Post.published);
    t.field(Post.authorId);
    t.nonNull.field("author", {
      type: "User",
      resolve: async (parent, _, { prisma }) => {
        const author = await prisma.post
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .author();
        if (author) return author;
        throw new Error(`Not Found: post author id: ${parent.authorId}`);
      },
    });
  },
});

export const CreateDraftInput = inputObjectType({
  name: "CreateDraftInput",
  definition(t) {
    t.field(Post.title);
    t.field(Post.content);
    t.nonNull.string("authorEmail");
  },
});
