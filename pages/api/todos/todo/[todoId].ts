import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";
import { env } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
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
    const { todoId } = req.query;
    const { status } = req.body;
    const todo = await prisma.todo.update({
      where: {
        id: Number(todoId),
      },
      data: {
        status,
      },
    });
    if (!todo) {
      return res.status(400).json({ error: "todo not found" });
    }
    res.status(200).json(todo);
  }
  if (req.method === "DELETE") {
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
    const { todoId } = req.query;
    const todo = await prisma.todo.delete({
      where: {
        id: Number(todoId),
      },
    });
    if (!todo) {
      return res.status(400).json({ error: "todo not found" });
    }
    res.status(200).json(todo);
  }
}
