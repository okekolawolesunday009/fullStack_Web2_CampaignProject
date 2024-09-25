import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS, REMOVE_NOTIFICATION } from "./notifiactionActionTypes";
import { MARK_AS_READ, SET_TYPE_FILTER } from "./notificationActionTypes";
import { NotificationTypeFilter } from "./notificationActionTypes";


// Action Creators
export const addNotification = (message, level = 'info') => ({
    type: ADD_NOTIFICATION,
    payload: { message, level, id: Date.now() }, // Use timestamp as a unique ID
  });
  
export const removeNotification = (id) => ({
    type: REMOVE_NOTIFICATION,
    payload: { id },
  });
  
export const clearNotifications = () => ({
    type: CLEAR_NOTIFICATIONS,
  });
  

export const markAsRead = (index) => ({
    type: MARK_AS_READ,
    index
})
// export const boundMarkAsRead = (index) => dispatch(markAsRead(index));

//    dispatch(addNotification(`Failed to create campaign: ${error.message}`, 'error'));

export const setNotificationFilter = (filter) => ({
    type: NotificationTypeFilter,
    filter
})