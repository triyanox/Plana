import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

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
    if (!user) {
      return res.status(401).send("Access denied.");
    }
    res.status(200).send(user);
  }
}
