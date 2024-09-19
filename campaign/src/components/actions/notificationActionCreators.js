import { MARK_AS_READ, SET_TYPE_FILTER } from "./notificationActionTypes";
import { NotificationTypeFilter } from "./notificationActionTypes";


export const markAsRead = (index) => ({
    type: MARK_AS_READ,
    index
})
// export const boundMarkAsRead = (index) => dispatch(markAsRead(index));


export const setNotificationFilter = (filter) => ({
    type: NotificationTypeFilter,
    filter
})