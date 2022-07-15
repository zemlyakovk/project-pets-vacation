import { SET_LOGOUT_USER } from "../types/auth.type";
import { SET_USER_DATA } from "../types/session.type";


export default function authReducer(state={}, action) {
  const {type} = action
  switch (type) {
    case SET_USER_DATA: {
      return {...action.payload}
    }
    case SET_LOGOUT_USER: {
      return {}
    }
    default: {
      return state;
    }
  }
}


