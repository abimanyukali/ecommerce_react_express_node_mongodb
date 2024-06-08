import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTdlNzMwN2E0MzQzMGZmYTAxMDM4MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNzAzODY1NywiZXhwIjoxNzE3Mjk3ODU3fQ.QNZqtJVsZaXUkVuJZKU-FEls3Ov_WB36_0Tq5q6OISk';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
