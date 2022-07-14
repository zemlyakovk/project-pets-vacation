import { SET_USER } from '../types';

const initState = {
  isLoading: false,
  value: {},
  err: ''
}

export default function userReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${SET_USER}_START`:
      return {
        ...state,
        isLoading: true,
        err: ''
      };
    case `${SET_USER}_SUCCESS`:
      console.log({
        ...state,
        value: payload,
        err: '',
        isLoading: false
      });
      return {
        ...state,
        value: payload,
        err: '',
        isLoading: false
      };
    case `${SET_USER}_ERROR`:
      return {
        ...state,
        isLoading: false,
        err: payload
      };

    default:
      return state;
  }
}
