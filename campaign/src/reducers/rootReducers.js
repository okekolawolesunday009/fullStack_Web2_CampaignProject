import { combineReducers } from "redux";
import uiReducer from "./uiReducers";
import campaignReducer from "./campaignReducers";
import notificationsReducer from "./notificationReducers";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist"

const persistConfig = {
    key: 'root',
    storage
}


const rootReducer = combineReducers({
    ui: uiReducer,
    campaigns: campaignReducer,
    notifications: notificationsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export default persistedReducer