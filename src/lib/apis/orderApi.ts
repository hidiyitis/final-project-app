import { z } from 'zod';
import { orderSchema, workerSchema, serviceSchema } from '../schemas/orderSchema';
import { BASE_URL_API } from '../config';
import { IFormOrder } from '../interfaces/orderInterface';
import { Session } from 'next-auth';

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
  
  const parsedData = z.array(orderSchema).safeParse(result.data);
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

export async function fetchWorker() {
  const token = localStorage.getItem('accessToken');
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

export async function fetchServices() {
  const token = localStorage.getItem('accessToken');
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
