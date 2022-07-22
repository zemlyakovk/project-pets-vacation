import { SET_CHAT } from '../types';

const initState = {
  isLoading: false,
  value: {},
  err: ''
}

export default function chatReducer(state = initState, action) {
  const { type, payload, err } = action;
  switch (type) {
    case `${SET_CHAT}_START`:
      return {
        ...state,
        isLoading: true,
        err: ''
      };
    case `${SET_CHAT}_SUCCESS`:
      return {
        ...state,
        value: payload,
        err: '',
        isLoading: false
      };
    case `${SET_CHAT}_ERROR`:
      return {
        ...state,
        isLoading: false,
        err: err
      };

    default:
      return state;
  }
}
