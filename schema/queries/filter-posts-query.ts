import { list, nullable, nonNull, queryField, stringArg } from "nexus";

export const filterPostsQueryField = queryField("filterPosts", {
  type: nonNull(list(nonNull("Post"))),
  args: {
    searchString: nullable(stringArg()),
  },
  resolve: (_parent, { searchString }, { prisma }) => {
    if (!searchString) return [];
    return prisma.post.findMany({
      where: {
        OR: [{ title: { contains: searchString } }, { content: { contains: searchString } }],
      },
    });
  },
});
