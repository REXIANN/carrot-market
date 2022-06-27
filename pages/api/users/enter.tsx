import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  let user;

  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (user == null) {
      console.log("user not found. will create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
  }

  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });

    if (user == null) {
      console.log("user not found. will create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
  }

  console.log({ user });
  return res.status(200).end();
}

export default withHandler("POST", handler);
