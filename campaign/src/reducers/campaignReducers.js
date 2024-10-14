import {Map} from "immutable"
import { 
    CREATE_CAMPAIGN, UPDATE_CAMPAIGN, DELETE_CAMPAIGN,
    FETCH_CAMPAIGN, FETCH_CAMPAIGN_REQUEST
} from '../actions/campaign/campaignTypes'
import { userNormalizer } from "../schema/user"
import { UPDATE_DEADLINE, UPDATE_TARGET } from "../actions/campaign/deadline/deadlineTargetTypes"


export const initialStateCampaign = {
    campaigns: [],
    loading: false,
    isCampaignAdded: false,
    isCampaignDeleted: false,
}
 export const campaignReducer = (state=initialStateCampaign, action) => {
    switch(action.type) {
      case FETCH_CAMPAIGN_REQUEST:
        return {
            ...state,
            campaigns: action.campaigns,
            loading: true
        }
        case FETCH_CAMPAIGN:
            return {
                ...state,
                campaigns: action.campaigns,
                loading: false
            }
        case CREATE_CAMPAIGN:
            return {
                ...state,
                isCampaignAdded: true
            }
        case UPDATE_CAMPAIGN:
            return {
                ...state,
                isCampaignAdded: false
            }
        case DELETE_CAMPAIGN: {

            return {
                ...state,
                isCampaignDeleted: true

            }         
        }
        case UPDATE_TARGET:
            return {
              ...state,
              byId: {
                ...state.byId,
                [action.payload.campaignId]: {
                  ...state.byId[action.payload.campaignId],
                  target: action.payload.newTarget
                }
              }
            };
      
          case UPDATE_DEADLINE:
            return {
              ...state,
              byId: {
                ...state.byId,
                [action.payload.campaignId]: {
                  ...state.byId[action.payload.campaignId],
                  deadline: action.payload.newDeadline
                }
              }
            };
      
           
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

export default campaignReducer