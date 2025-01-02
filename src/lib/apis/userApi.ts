import { z } from "zod";
import { userSchema } from "../schemas/userSchema";
import { BASE_URL_API } from "../config";
import { IUser, IFormUser } from "../interfaces/userInterface";
import { Session } from "next-auth";

export async function fetchUsers(query: string, session: Session) {
  const token = session.user.accessToken;
  const response = await fetch(`${BASE_URL_API}/users?status=AVAILABLE`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result?.message);
  }

  const parsedData = z.array(userSchema).safeParse(result.data);
  if (!parsedData.success) {
    throw new Error("Validation failed");
  }

  return parsedData.data;
}

export async function fetchCreateUser(data: IFormUser, session: Session) {
  const token = session.user.accessToken;
  const response = await fetch(`${BASE_URL_API}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result?.message);
  }

  return result;
}

export async function fetchUpdateUser(
  id: number,
  data: IFormUser,
  session: Session
) {
  const token = session.user.accessToken;
  const response = await fetch(`${BASE_URL_API}/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // const result = await response.json();
  // if (!result.status) {
  //   throw new Error(result?.message);
  // }

  // return result;
  const result = await response.json();
  console.log("Update response:", result); // Cek respons dari server
  return result;
}

export async function fetchDeleteUser(id: number, session: Session) {
  const token = session.user.accessToken;

  const response = await fetch(`${BASE_URL_API}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result?.message || "Unexpected error occurred");
  }

  return result;
}

export async function fetchUserById(id: Number, session: Session) {
  const token = session.user.accessToken;

  const response = await fetch(`${BASE_URL_API}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (!result.status) {
    throw new Error(result?.message);
  }

  // Validate data using Zod
  const parsedData = userSchema.safeParse(result.data);
  if (!parsedData.success) {z
    throw new Error("Validation failed");
  }

  return parsedData.data;
}

// fetchUsers.ts
export async function fetchFindUsers(query: string, session: any) {
  const res = await fetch(`/api/users?search=${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return data;
}
