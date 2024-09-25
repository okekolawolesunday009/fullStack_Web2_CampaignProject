import { combineReducers } from "redux";
import uiReducer from "./uiReducers";
import campaignReducer from "./campaignReducers";
import notificationsReducer from "./notificationReducers";


const rootReducer = combineReducers({
    ui: uiReducer,
    campaign: campaignReducer,
    notification: notificationsReducer
})
export default rootReducer