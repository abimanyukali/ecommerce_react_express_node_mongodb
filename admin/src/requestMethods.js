import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

// const TOKEN  ="sdkjsfj";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user)
  ?.currentUser?.accessToken;

// const accessToken=(localStorage.getItem("persist:root"));
// const accessToken1=(JSON.parse(accessToken).user);
// const accessToken2=(JSON.parse(accessToken1).currentUser.accessToken);
// console.log(accessToken2);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
