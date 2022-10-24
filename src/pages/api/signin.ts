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

  let responseBody: Response | null = null;
  if (response.status === 201) {
    responseBody = (await response.json()) as Response;
    const date = new Date();
    date.setSeconds(date.getSeconds() + responseBody.expires_in);
    res.setHeader(
      "Set-Cookie",
      `access_token=${
        responseBody.access_token
      }; Expires=${date.toUTCString()}; HttpOnly`
    );
  }

  res.status(response.status).json(response.body);
}
