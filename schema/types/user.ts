import { inputObjectType, objectType } from "nexus";

import { User } from "nexus-prisma";

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.field(User.id);
    t.field(User.name);
    t.field(User.email);
    // t.field(User.posts)
    t.list.field("posts", {
      type: "Post",
      resolve: (parent, _, { prisma }) =>
        prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .posts(),
    });
  },
});

export const SignupUserInput = inputObjectType({
  name: "SignupUserInput",
  definition(t) {
    t.field(User.name);
    t.field(User.email);
  },
});
