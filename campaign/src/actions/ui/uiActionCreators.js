
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
import { FURL } from '../../config.js/config';





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
        const response = await axios.post(`${FURL}/api/auth/login`, { email, password })
        //  const response = await axios.post("https://fullstack-web2-campaignproject.onrender.com/api/auth/login", { email, password })
        dispatch(loginSuccess(response.data.token));
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data.token, "login"))
        toast.success('Succesful Login')
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        dispatch(loginFailure(error.response ? error.response.data : error.message));
        toast.error(error.response)

    }
};
export const SignupRequest = (fullName, email, password, region) => async (dispatch) => {
    try {
        const response = await axios.post(`${FURL}/api/auth/signup`, {fullName, email, password, region })
        dispatch(loginSuccess(response.data.token))
        // console.log(dispatch(loginSuccess(response.data.user)))
        // console.log(loginSuccess(response.data))ss
        toast.success('Succesful Registration')
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        dispatch(loginFailure(error.response ? error.response.data : error.message));
        toast.error(error.response)
    }
};