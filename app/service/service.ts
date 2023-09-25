import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://elevien-fe-job.free.beeceptor.com',
  timeout: 25 * 1000
});
