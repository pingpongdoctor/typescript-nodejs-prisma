import prisma from "../services/prismaClient";
import { Request, Response } from "express";

export const getAllUser = async function (req: Request, res: Response) {
  try {
    const users = await prisma.userProfile.findMany({
      include: {
        userInfor: true,
      },
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({
      message: "fail",
      errorStatus: 400,
    });
  }
};
