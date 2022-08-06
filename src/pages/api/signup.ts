import { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const user = { id: "id" };
  res.status(200).json(user);
}
