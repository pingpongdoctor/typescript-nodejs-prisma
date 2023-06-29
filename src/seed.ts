import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //CREATE ONE USER PROFILE WITH ONE USER INFOR (1-1 REALATIONSHIP)
  // const user = await prisma.userProfile.create({
  //   data: {
  //     username: "Alice",
  //     password: "alice@prisma.io",
  //     userInfor: {
  //       create: {
  //         age: 19,
  //         birthday: new Date("1993-01-13"),
  //       },
  //     },
  //   },
  // });
  // console.log(user);
  //GET ALL USERS WITH USERINFOR
  const users = await prisma.userProfile.findMany({
    include: {
      userInfor: true,
    },
  });
  // console.log(users);
  //GET ALL TEACHERS WITH USERINFOR ID 2
  // const users = await prisma.teacher.findMany({
  //   where: {
  //     userGeneralInfo: {
  //       some: {
  //         profileId: 2,
  //       },
  //     },
  //   },
  //   include: {
  //     userGeneralInfo: true,
  //   },
  // });
  // console.log(users);
  // #####################
  //THERE IS AN ERROR IF YOU CREATE ONE USER INFOR WITH NO USER PROFILE
  // const user = await prisma.userGeneralInfo.create({
  //   data: {
  //     age: 19,
  //     birthday: new Date("1993-02-13"),
  //     },
  //   },
  // });
  // console.log(user);
  // #####################
  //UPDATE THE USER INFOR
  // const updatedUser = await prisma.userGeneralInfo.update({
  //   where: {
  //     profileId: 2,
  //   },
  //   data: { age: 22 },
  // });
  // console.log(updatedUser);
  // #####################
  //DELETE USER PROFILE AND THE USER INFOR WILL BE DELETED (NEED TO SET CASCADE)
  // const deletedUser = await prisma.userProfile.delete({
  //   where: {
  //     id: 1,
  //   },
  // });
  // console.log(deletedUser);
  // #####################
  //CREATE A USER INFOR AND CONNECT IT TO THE CURRENT USER PROFILE
  // const userInfor = await prisma.userGeneralInfo.create({
  //   data: {
  //     age: 18,
  //     birthday: new Date("1995-02-25"),
  //     profile: {
  //       connect: { id: 2 },
  //     },
  //   },
  // });
  // #####################
  //CREATE MENTOR AND CONNECT IT TO AN AVAILABLE USER INFOR
  // const mentor = await prisma.mentor.create({
  //   data: {
  //     name: "simon",
  //     age: 19,
  //     //CONNECT WITH USER INFOR WHERE PROFILE ID IS 2
  //     userGeneralInfor: {
  //       connect: { profileId: 2 },
  //     },
  //   },
  // });
  // #####################
  //DELETE MENTOR WITHOUT DELETING THE USER INFOR
  //THE MENTOR ID IN THE USER INFOR RECORD IS AUTOMATICALLY SET TO NULL
  // const deletedMentor = await prisma.mentor.delete({
  //   where: {
  //     id: 1,
  //   },
  // });
  // #####################
  //CREATE ONE TEACHER THEN CONNECT IT TO THE CURRENT USER INFOR
  // const teacher = await prisma.teacher.create({
  //   data: {
  //     name: "simon7",
  //     like: 1,
  //     userGeneralInfo: {
  //       connect: {
  //         profileId: 2,
  //       },
  //     },
  //   },
  // });
  // #####################
  //DISCONNECT TEACHERS FROM USER
  const disconnectTeachers = await prisma.userGeneralInfo.update({
    where: { profileId: 2 },
    data: {
      teacher: {
        disconnect: [{ id: 10 }, { id: 11 }],
      },
    },
  });
}

main()
  .then(async () => {
    //DISCONNECT PRISMA CLIENT FROM DATABASE
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    //EXIT THE NODE.JS PROCESS WITH A NON ZERO CODE
    process.exit(1);
  });
