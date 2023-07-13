// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpStatusCode } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = {
  message: string;
  status: HttpStatusCode;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    if (email === "admin@mail.com" && password === "admin") {
      setTimeout(() => {
        res.setHeader(
          "Set-Cookie",
          serialize("auth", "authenticated", { path: "/" })
        );
        res.status(200).json({ message: "authenticated", status: 200 });
      }, 2000);
    } else {
      return res.status(401).json({ message: "unauthorized!", status: 401 });
    }
  }

  return;
}
