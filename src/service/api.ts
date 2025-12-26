import { BASE_URL } from '@/constants/urls';
import axios from 'axios';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});
