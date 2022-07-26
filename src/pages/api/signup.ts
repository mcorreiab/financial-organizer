import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch("http://localhost:8080/users", {
    method: "POST",
    body: req.body,
  });

  res.status(response.status).json(JSON.stringify(await response.json()));
}
