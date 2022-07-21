import { SET_FAVORIT, ADD_FAVORIT } from '../types/favorit.type';

const initState = {
  isLoading: false,
  value: [],
  err: ''
}

export default function favoritReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${ADD_FAVORIT}_START`:
      return {
        ...state,
        isLoading: true,
        err: ''
      };
    case `${ADD_FAVORIT}_SUCCESS`:
      return {
        ...state,
        value: payload,
        err: '',
        isLoading: false
      };
    case `${ADD_FAVORIT}_ERROR`:
      return {
        ...state,
        isLoading: false,
        err: payload
      };

    case `${SET_FAVORIT}_START`:
    return {
      ...state,
      isLoading: true,
      err: ''
    };
    case `${SET_FAVORIT}_SUCCESS`:
      return {
        ...state,
        value: payload,
        err: '',
        isLoading: false
      };
    case `${SET_FAVORIT}_ERROR`:
      return {
        ...state,
        isLoading: false,
        err: payload
      };
      // case `DELETE_FAVORIT`:
      //   return {
      //     ...state,
      //     value: payload,
      //     err: '',
      //     isLoading: false
      //   };

    default:
      return state;
  }
}
