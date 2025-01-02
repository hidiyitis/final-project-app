import { z } from 'zod';
import { serviceSchema } from '../schemas/serviceSchema';
import { BASE_URL_API } from '../config';
import { IService } from '../interfaces/serviceInterface';
import { Session } from 'next-auth';

export async function fetchServices(query: string, session: Session) {
  const token = session.user.accessToken
  const response = await fetch(`${BASE_URL_API}/services?search=${query}`, {
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


export async function fetchCreateService(data: IService, session: Session) {
  const token = session.user.accessToken
  const response = await fetch(`${BASE_URL_API}/services`, {
    method: 'POST',
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

export async function fetchUpdateService(id: number, data: IService, session: Session) {
  const token = session.user.accessToken;
  const response = await fetch(`${BASE_URL_API}/services/${id}`, {
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

export async function fetchDeleteService(id:number, session: Session) {
  const token = session.user.accessToken;
  console.log("ID yang dikirim ke API:", id);

  const response = await fetch(`${BASE_URL_API}/services/${id}`, {
    method: 'DELETE',
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