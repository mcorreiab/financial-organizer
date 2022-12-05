import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  access_token: string;
  token_type: string;
  expires_in: number;
  //   refreshToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch("http://localhost:8080/signin", {
    method: "POST",
    body: req.body,
  });

  const body = await response.json();

  if (response.status === 201) {
    const successBody = body as Response;
    const date = new Date();
    date.setSeconds(date.getSeconds() + successBody.expires_in);
    res.setHeader(
      "Set-Cookie",
      `access_token=${
        successBody.access_token
      }; Expires=${date.toUTCString()}; HttpOnly; Path=/; Secure`
    );
  }

  res.status(response.status).json(JSON.stringify(body));
}
