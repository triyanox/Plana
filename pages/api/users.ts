import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import Joi from "joi";
import bcrypt from "bcrypt";

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
      res.status(400).json({ error: isValid.error.message });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json(user);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
