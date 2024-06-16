import { publicRequest, userRequest } from '../requestMethods';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from './productRedux';
import { loginFailure, loginStart, loginSuccess } from './userRedux';

//LOGIN
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
//GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

//DELETE  PRODUCTS
export const deleteProducts = async (dispatch, id) => {
  console.log(id);
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
//UPDATE  PRODUCTS
export const updateProducts = async (id, product, dispatch) => {
  console.log(id, product, dispatch);
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    const data = res.data;
    dispatch(updateProductSuccess({ id, data }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};
//ADD  PRODUCTS
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/products",product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};
