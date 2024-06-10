import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login =async(dispatch,user)=>{
    
    dispatch(loginStart());
    try {
        const res =await publicRequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data))
        console.log(res.data);
    } catch (error) {
        dispatch(loginFailure())
    }
} 