import type { NextApiRequest, NextApiResponse } from "next";
import { Expense } from "@/model/expense";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  const payload: Expense = {
    name: body.name,
    value: parseFloat(body.value),
  };

  const response = await fetch("http://localhost:8080/expenses", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${req.cookies["access_token"]}`,
    },
  });

  res.status(response.status).json(await response.json());
}
