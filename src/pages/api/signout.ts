import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

interface Data {
  message: string;
  status: HttpStatusCode;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    setTimeout(() => {
      res.setHeader(
        "Set-Cookie",
        serialize("auth", "", { path: "/", expires: new Date() })
      );
      res.status(200).json({ message: "signedout", status: 200 });
    }, 2000);
  }

  return;
}
