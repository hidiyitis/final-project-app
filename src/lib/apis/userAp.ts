import { z } from "zod";
import { BASE_URL_API } from "../config";
import { Session } from "next-auth";
import { userSchema } from "../schemas/userSchema";
import { userServce } from "../interfaces/useTerface";


export async function updateUsers(data: userServce, session: Session) {
  const token = session.user.accessToken;
  const id = session.user.id
  const response = await fetch(`${BASE_URL_API}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result?.message)
  }

  return result;
}