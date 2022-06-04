import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { env } from "process";
import { Status } from "@prisma/client";
type Todo = {
  text: string;
  status: Status;
};

type TodoData = {
  id: number;
  text: string;
  status: Status;
  listId: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { text, status } = req.body as Todo;
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const user: any = jwt.verify(token, env.JWT_SECRET as string);
    if (!user) return res.status(401).send("Access denied.");
    if (!text || !status) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const todo = await prisma.todo.create({
      data: {
        text,
        status,
        user: { connect: { id: user.id } },
      },
    });
    console.log(todo);
    res.status(200).send(todo);
  } else if (req.method === "PUT") {
    const { id, text, status } = req.body as TodoData;
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const user: any = jwt.verify(token, env.JWT_SECRET as string);
    if (!user) return res.status(401).send("Access denied.");
    if (!text || !status) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        text,
        status,
        user: { connect: { id: user.id } },
      },
    });
    console.log(todo);
    res.status(200).send(todo);
  } else if (req.method === "GET") {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const user: any = jwt.verify(token, env.JWT_SECRET as string);
    if (!user) return res.status(401).send("Access denied.");
    const todos = await prisma.todo.findMany({
      where: { user: { id: user.id } },
    });
    res.status(200).send(todos);
  } else if (req.method === "DELETE") {
    const { id } = req.body as TodoData;
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const user: any = jwt.verify(token, env.JWT_SECRET as string);
    if (!user) return res.status(401).send("Access denied.");
    const todo = await prisma.todo.delete({
      where: { id },
    });
    res.status(200).send(todo);
  }
}
