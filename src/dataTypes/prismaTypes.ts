import { Prisma } from "@prisma/client";

const userProfile = Prisma.validator<Prisma.UserProfileArgs>()({
  include: {
    userInfor: true,
  },
});

//TYPE OF USER PROFILE RECORD
export type UserProfileType = Prisma.UserProfileGetPayload<typeof userProfile>;
