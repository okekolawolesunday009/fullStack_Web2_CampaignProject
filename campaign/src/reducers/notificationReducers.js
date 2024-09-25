import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS, REMOVE_NOTIFICATION, SET_TYPE_FILTER } from "../actions/notification/notifiactionActionTypes";

export const initialNotificationState = {
    notifications: [],
    filter: 'DEADLINE',
    count: 0
};
  
  const notificationsReducer = (state = initialNotificationState, action) => {
    switch (action.type) {
      case ADD_NOTIFICATION:
        return {
          ...state,
          notifications: [...state.notifications, action.payload],
          count: state.count + 1,
        };
  
      case REMOVE_NOTIFICATION:
        return {
          ...state,
          notifications: state.notifications.filter(notification => notification.id !== action.payload.id),
          count: state.count - 1,
        };
        case SET_TYPE_FILTER:
            return {
                ...state,
                filter: action.payload, // Update the filter type
            };
      case CLEAR_NOTIFICATIONS:
        return initialNotificationState; // Reset to initial state
  
      default:
        return state; // Return current state if no actions match
    }
  };

export default notificationsReducer
  