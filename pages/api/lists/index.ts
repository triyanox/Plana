import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { env } from "process";
import { Status } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const user: any = jwt.verify(token, env.JWT_SECRET as string);
    if (!user) return res.status(401).send("Access denied.");
    const isExist = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!isExist) {
      return res.status(400).json({ error: "user not found" });
    }
    let lists = await prisma.list.findMany({
      where: {
        user: {
          id: isExist.id,
        },
      },
    });
    return res.status(200).json(lists);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
