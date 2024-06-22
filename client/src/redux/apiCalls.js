import { publicRequest } from '../requestMethods';
import {
 
  loginFailure,
  loginStart,
  loginSuccess,
} from './userRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const forgot = async (token, password) => {
  try {
    await publicRequest.post(`/auth/reset-password/${token}`, {
      password,
    });
  } catch (error) {}
};
