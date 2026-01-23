import type { LoginRequest, LoginResponse } from '@/global/types/auth';
import type { ApiError } from '@/global/types/common';
import type { RegisterRequest, RegisterResponse } from '@/global/types/auth';
const API_BASE = import.meta.env.VITE_API_URL || 'https://api.example.com';

export async function loginUser(
  credentials: LoginRequest
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || 'Login failed',
        status: response.status,
      };
      throw error;
    }

    return data as LoginResponse;
  } catch (err) {
    const error = err as ApiError;
    throw {
      message: error.message || 'Network error. Please try again.',
      status: error.status || 0,
    };
  }
}

// Optional: you can add more auth helpers here later
export async function getCurrentUser(token: string) {
  // implementation...
}


// src/global/api/auth.ts  (append to existing file)

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: result.message || 'Registration failed',
        status: response.status,
      };
      throw error;
    }

    return result as RegisterResponse;
  } catch (err) {
    const error = err as ApiError;
    throw {
      message: error.message || 'Network error. Please try again.',
      status: error.status || 0,
    };
  }
}

