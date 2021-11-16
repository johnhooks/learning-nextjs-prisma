import { arg, nonNull, mutationField } from "nexus";

export const signupUserMutationField = mutationField("signupUser", {
  type: "User",
  args: {
    data: nonNull(
      arg({
        type: "SignupUserInput",
      })
    ),
  },
  resolve: (_, { data: { name, email } }, { prisma }) => {
    return prisma.user.create({
      data: {
        name,
        email,
      },
    });
  },
});
