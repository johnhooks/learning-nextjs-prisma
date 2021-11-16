import { queryField } from "nexus";

export const meQueryField = queryField("me", {
  type: "User",
  resolve: (_parent, _args, { prisma }) => {
    return prisma.user.findUnique({
      where: { id: 1 },
    });
  },
});
