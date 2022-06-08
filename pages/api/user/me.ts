import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const cookie = req.cookies.token;
    if (!cookie) {
      return res.status(401).send("Access denied. No token provided.");
    }
    const user: any = jwt.verify(cookie, process.env.JWT_SECRET as string);
    const found = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!found) {
      return res.status(401).send("Access denied.");
    }
    if (!user) {
      return res.status(401).send("Access denied.");
    }
    const lists = await prisma.list.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
    res.status(200).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        lists: lists,
      },
    });
  } else {
    res.status(405).send("Method not allowed");
  }
}
