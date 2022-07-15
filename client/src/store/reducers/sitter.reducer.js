import { SET_SITTER } from '../types';

const initState = {
  isLoading: false,
  value: {},
  err: ''
}

export default function sitterReducer(state = initState, action) {
  const { type, payload, err } = action;
  switch (type) {
    case `${SET_SITTER}_START`:
      return {
        ...state,
        isLoading: true,
        err: ''
      };
    case `${SET_SITTER}_SUCCESS`:
      return {
        ...state,
        value: payload,
        err: '',
        isLoading: false
      };
    case `${SET_SITTER}_ERROR`:
      return {
        ...state,
        isLoading: false,
        err: err
      };

    default:
      return state;
  }
}
