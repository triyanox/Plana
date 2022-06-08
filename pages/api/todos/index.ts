import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { env } from "process";
import { Status } from "@prisma/client";
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
  if (req.method === "POST") {
    const { text, listId } = req.body as TodoData;
    const isValid = schema.validate({ text, listId });
    if (isValid.error) {
      return res.status(400).json({ error: isValid.error.message });
    }
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
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });
    if (!list) {
      return res.status(400).json({ error: "list not found" });
    }
    const todo = await prisma.todo.create({
      data: {
        text,
        list: {
          connect: {
            id: list.id,
          },
        },
        status: Status.OPEN,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    res.status(200).json(todo);
  }
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
    let todos = await prisma.todo.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    res.status(200).json(todos);
  }
}
