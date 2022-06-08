import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";

type Data = {
  name: string;
  email: string;
  password: string;
};

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(256).required(),
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { name, email, password } = req.body as Data;

    const isValid = schema.validate({ name, email, password });
    if (isValid.error) {
      return res.status(400).json({ error: isValid.error.message });
    }
    const isExist = await prisma.user.findUnique({
      where: { email },
    });
    if (isExist) {
      return res.status(400).json({ error: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json("user created successfully");
  } else if (req.method === "PUT") {
    let { name, email, password } = req.body as Data;
    const isValid = schema.validate({ name, email, password });
    if (isValid.error) {
      res.status(400).json({ error: isValid.error.message });
      return;
    }
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const user: any = jwt.verify(token, env.JWT_SECRET as string);
    if (!user) return res.status(401).send("Access denied.");
    const isExist = await prisma.user.findUnique({
      where: { email },
    });
    if (!isExist) {
      return res.status(400).json({ error: "user not found" });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: { email: user.email },
      data: {
        ...req.body,
      },
    });
    res.status(200).json("user updated successfully");
  } else if (req.method === "DELETE") {
  } else {
    res.status(405).send("Method not allowed");
  }
}
