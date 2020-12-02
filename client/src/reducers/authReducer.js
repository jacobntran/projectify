import {
  SIGN_IN,
  SIGN_OUT,
  SET_REDIRECT_URL,
  REMOVE_NOTIFICATION,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  name: null,
  userId: null,
  redirectURL: null,
  notifications: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        name: action.payload.name,
        notifications: action.payload.notifications,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case SET_REDIRECT_URL:
      return { ...state, redirectURL: action.payload.redirectURL };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter(
            (notif) => notif._id !== action.payload
          ),
        ],
      };
    default:
      return state;
  }
};
