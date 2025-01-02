import { z } from 'zod';
import { BASE_URL_API } from '../config';
import { Session } from 'next-auth';
import { dashboardChartSchema, dashboardCardSchema } from '../schemas/dashboardSchema';

// Fungsi untuk fetch data chart di dashboard
export async function fetchDashboardChart(session: Session) {
  const token = session.user.accessToken;

  const response = await fetch(`${BASE_URL_API}/dashboard/chart`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (!result.status) {
    throw new Error(result?.message);
  }

  // Validasi data menggunakan Zod
  const parsedData = dashboardChartSchema.safeParse(result.data);
  if (!parsedData.success) {
    throw new Error('Validation failed');
  }

  return parsedData.data;
}

// Fungsi untuk fetch data card di dashboard
export async function fetchDashboardCard(session: Session) {
  const token = session.user.accessToken;

  const response = await fetch(`${BASE_URL_API}/dashboard/card`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (!result.status) {
    throw new Error(result?.message);
  }

  // Validasi data menggunakan Zod
  const parsedData = dashboardCardSchema.safeParse(result.data);
  if (!parsedData.success) {
    throw new Error('Validation failed');
  }

  return parsedData.data;
}

// Fungsi untuk fetch semua data dashboard (chart + card)
export async function fetchDashboardData(query: string, session: Session) {
  const token = session.user.accessToken;

  const [chartResponse, cardResponse] = await Promise.all([
    fetch(`${BASE_URL_API}/dashboard/chart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),
    fetch(`${BASE_URL_API}/dashboard/card`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }),
  ]);

  const chartResult = await chartResponse.json();
  const cardResult = await cardResponse.json();

  if (!chartResult.status || !cardResult.status) {
    throw new Error('Failed to fetch dashboard data');
  }

  // Validasi data menggunakan Zod
  const chartData = dashboardChartSchema.safeParse(chartResult.data);
  const cardData = dashboardCardSchema.safeParse(cardResult.data);

  if (!chartData.success || !cardData.success) {
    throw new Error('Validation failed');
  }

  return {
    chart: chartData.data,
    card: cardData.data,
  };
}
