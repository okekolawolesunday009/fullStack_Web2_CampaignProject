
import axios from 'axios';
import {
	LOGIN,
	LOGOUT,
	DISPLAY_NOTIFICATION_DRAWER,
	HIDE_NOTIFICATION_DRAWER,
} from './uiActionTypes';
import { LOGIN_SUCCESS } from './uiActionTypes';
import { LOGIN_FAILURE } from './uiActionTypes';
import {toast} from 'react-toastify'





export function login(email, password) {
	return {
		type: LOGIN,
		user: { email, password },
	};
}

export const boundLogin = (email, password) => (dispatch) => {
    dispatch(login(email, password));
  };
  

export const logout = () => ({type: LOGOUT})
export const boundLogout = (dispatch) => dispatch(logout());


export function displayNotificationDrawer () {
    return {type: DISPLAY_NOTIFICATION_DRAWER}
 }

 export const boundDisplayNotificationDrawer = (dispatch) => dispatch(displayNotificationDrawer());

export function hideNotificationDrawer () {
    return {type: HIDE_NOTIFICATION_DRAWER}
}

export const boundHideNotificationDrawer = (dispatch) => dispatch(hideNotificationDrawer());

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

export const bondSuccess = (user) => (dispatch) => dispatch(loginSuccess(user))




export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        error
    }
}
export const bondFailure = (error) => (dispatch) => dispatch(loginFailure(error))



export const loginRequest = (email, password) => async (dispatch) => {
    // dispatch(login(email, password));
    try {
        // const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
         const response = await axios.post("https://full-stack-web2-campaign-project.vercel.app/login", { email, password })
        // https://full-stack-web2-campaign-project.vercel.app/signup
        toast.success("Login successful");
        dispatch(loginSuccess(response.data.user));
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data.user))
    } catch (error) {
        toast.error("Login failed");
        dispatch(loginFailure(error.response ? error.response.data : error.message));
    }
};
export const SignupRequest = (fullName, email, password, region) => async (dispatch) => {
    try {
        const response = await axios.post("https://full-stack-web2-campaign-project.vercel.app/signup", { email, password })
        toast.success("Signup successful");
        dispatch(loginSuccess(response.data.user))
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data.user))
    } catch (error) {
        toast.error("Signup failed");
        dispatch(loginFailure(error.response ? error.response.data : error.message));
    }
};