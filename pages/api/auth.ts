import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { env } from "process";

type Data = {
  email: string;
  password: string;
};

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(256).required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { email, password } = req.body as Data;

    const isValid = schema.validate({ email, password });
    if (isValid.error) {
      res.status(400).json({ error: isValid.error.message });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(400).json({ error: "user does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "password is incorrect" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      env.JWT_SECRET as string
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", String(token), {
        httpOnly: true,
        secure: env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      })
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json("user logged in successfully");
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
