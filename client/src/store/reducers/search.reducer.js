import { SEARCH } from '../types';

const initState = {
  isLoading: false,
  value: {},
  err: ''
}

export default function searchReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${SEARCH}_START`:
      return {
        ...state,
        isLoading: true,
        err: ''
      };
    case `${SEARCH}_SUCCESS`:
      return {
        ...state,
        value: payload,
        err: '',
        isLoading: false
      };
    case `${SEARCH}_ERROR`:
      return {
        ...state,
        isLoading: false,
        err: payload
      };

    default:
      return state;
  }
}
