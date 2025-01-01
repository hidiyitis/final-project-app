import { z } from "zod";
import { workerSchema } from "../schemas/workerSchema";
import { BASE_URL_API } from "../config";
import { Session } from "next-auth";

export async function fetchWorker(session: Session) {
  const token = session.user.accessToken
  const response = await fetch(`${BASE_URL_API}/workers`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result?.message)
  }
  

  // Validate data using Zod
  const parsedData = z.array(workerSchema).safeParse(result.data);
  if (!parsedData.success) {
    throw new Error('Validation failed');
  }

  return parsedData.data;
}