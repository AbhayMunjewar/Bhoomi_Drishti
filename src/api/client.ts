/**
 * BhoomiDristi FastAPI REST API Client Abstraction Layer
 * Communicates with FastAPI + PostgreSQL + PostGIS + pgvector Backend Endpoints:
 * - /api/auth/*
 * - /api/government/*
 * - /api/research/*
 * - /api/institution/*
 * - /api/public/*
 * - /api/admin/*
 * - /api/gis/*
 * - /api/policy/*
 * - /api/reports/*
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('bhoomi_auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // In frontend prototype mode, fallback gracefully to mock service handler
    console.warn(`[API CLIENT] Endpoint ${endpoint} unreachable or unmocked in backend. Using client-side mock service.`, error);
    throw error;
  }
}
