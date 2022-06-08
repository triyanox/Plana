import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { env } from "process";
import Joi from "joi";

const schema = Joi.object({
  text: Joi.string().min(2).max(256).required(),
  listId: Joi.number().required(),
});

type TodoData = {
  text: string;
  listId: number;
};

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
    const listId = req.query.id as string;
    const todos = await prisma.todo.findMany({
      where: {
        list: {
          id: parseInt(listId),
        },
      },
    });
    return res.status(200).json(todos.reverse());
  }
}
