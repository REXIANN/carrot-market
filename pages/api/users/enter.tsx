import { NextApiRequest, NextApiResponse } from "next";

import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";

import { ResponseType } from "@/libs/server/types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  if (user == null) {
    return res.status(400).json({ ok: false });
  }

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  console.log(token);
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
