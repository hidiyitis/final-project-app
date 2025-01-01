import { z } from 'zod';
import { Session } from "next-auth";
import { BASE_URL_API } from "../config";
import { serviceSchema } from "../schemas/serviceSchema";

export async function fetchServices(session: Session) {
  const token = session.user.accessToken
  const response = await fetch(`${BASE_URL_API}/services?status=AVAILABLE`, {
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
  
  const parsedData = z.array(serviceSchema).safeParse(result.data);
  if (!parsedData.success) {
    throw new Error('Validation failed');
  }

  return parsedData.data;
}