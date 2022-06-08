import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
import cookie from "cookie";

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
    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...req.body,
      },
    });
    if (!updateUser) {
      return res.status(400).json({ error: "user can't be update !" });
    }
    const newToken = jwt.sign(
      {
        id: updateUser.id,
        name: updateUser.name,
        email: updateUser.email,
      },
      env.JWT_SECRET as string
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", String(newToken), {
        httpOnly: true,
        secure: env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      })
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json("user updated successfully");
  } else if (req.method === "DELETE") {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const user: any = jwt.verify(token, env.JWT_SECRET as string);
    if (!user) return res.status(401).send("Access denied.");
    await prisma.list.deleteMany({
      where: { user: { id: user.id } },
    });
    await prisma.todo.deleteMany({
      where: { user: { id: user.id } },
    });
    const deleteUser = await prisma.user.delete({
      where: { id: user.id },
    });
    if (!deleteUser) {
      return res.status(400).json({ error: "user can't be delete !" });
    }
    res.setHeader("Set-Cookie", [
      `token=; Path=/; Expires=${new Date(0).toUTCString()}`,
    ]);
    res.status(200).json("user deleted successfully");
  } else {
    res.status(405).send("Method not allowed");
  }
}
