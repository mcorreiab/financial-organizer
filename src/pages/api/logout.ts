import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    "access_token=deleted; path=/;  expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );

  res.status(200).json({});
}
