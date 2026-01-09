import { API_BASE_URL } from '../config/api';

export interface LoginCredentials {
  Username: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Credenciais inválidas.');
    }

    return await response.json();
  },
};
