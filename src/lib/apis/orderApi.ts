import { z } from 'zod';
import { orderSchema } from '../schemas/orderSchema';
import { BASE_URL_API } from '../config';
import { IFormOrder } from '../interfaces/orderInterface';
import { Session } from 'next-auth';
import { workerSchema } from '../schemas/workerSchema';

export async function fetchOrders(query: string, session: Session) {
  const token = session.user.accessToken
  const response = await fetch(`${BASE_URL_API}/orders?search=${query}`, {
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
  console.log(result.data);
  
  
  const parsedData = z.array(orderSchema).safeParse(result.data);
  console.log(parsedData.error);
  
  if (!parsedData.success) {
    throw new Error('Validation failed');
  }

  return parsedData.data;
}

export async function fetchOrderById(id: Number, session: Session) {
  const token = session.user.accessToken;
  
  const response = await fetch(`${BASE_URL_API}/orders/${id}`, {
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
  const parsedData = orderSchema.safeParse(result.data);
  if (!parsedData.success) {
    throw new Error('Validation failed');
  }

  return parsedData.data;
}


export async function fetchCreateOrder(data: IFormOrder, session: Session) {
  const token = session.user.accessToken
  const response = await fetch(`${BASE_URL_API}/orders`, {
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

export async function fetchUpdateOrder(id: number, data: IFormOrder, session: Session) {
  const token = session.user.accessToken;
  const response = await fetch(`${BASE_URL_API}/orders/${id}`, {
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
