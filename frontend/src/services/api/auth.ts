import apiClient from './client';

export const login = async (email: string, password: string) => {
  return apiClient.post('/auth/login', { email, password });
};

export const register = async (email: string, password: string, username?: string) => {
  return apiClient.post('/auth/register', { email, password, username });
};
