import {Map} from "immutable"
import { 
    DISPLAY_NOTIFICATION_DRAWER, 
    HIDE_NOTIFICATION_DRAWER, 
    LOGIN_FAILURE, LOGIN_SUCCESS, 
    LOGOUT } from "../actions/uiActionTypes"
import { userNormalizer } from "../schema/user"


export const initialState = {
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: null
}
 export const uiReducer = (state= initialState, action) => {
    switch(action.type) {
        case DISPLAY_NOTIFICATION_DRAWER:
            return {
                ...state,
                isNotificationDrawerVisible: true
            }
        case HIDE_NOTIFICATION_DRAWER:
            return {
                ...state,
                isNotificationDrawerVisible: false
            }
        case LOGIN_SUCCESS: {

            return {
                ...state,
                isUserLoggedIn: true,
                isNotificationDrawerVisible: false,
                user: action.user

            }
           
        }
           
        case LOGIN_FAILURE:
            return {
                ...state,
                isUserLoggedIn: false,
                isNotificationDrawerVisible: false,
                user: null
            }
           
        case LOGOUT: 
            return {
                ...state,
                isUserLoggedIn: false,
                isNotificationDrawerVisible: false,
                user: null
            }
    
        default:
            return state

    }
}

// export const uiReducer = (state= initialState, action) => {
//     switch(action.type) {
//         case DISPLAY_NOTIFICATION_DRAWER:
//             return state.set('isNotificationDrawerVisible', true)
//         case HIDE_NOTIFICATION_DRAWER:
//             return state.set('isNotificationDrawerVisible', false)
//         case LOGIN_SUCCESS:
//             return state
//             .set('isUserLoggedIn', true)
//             .set('user', action.user)
//         case LOGIN_FAILURE:
//             return state
//             .set('isUserLoggedIn', false)
//             .set('user', null)
//         case LOGOUT: 
//             return state
//             .set('isUserLoggedIn', false)
//             .set('user', null)

    
//         default:
//             return state

//     }
// }

export default uiReducer