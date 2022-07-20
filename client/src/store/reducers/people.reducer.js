import { SET_SITTERS } from "../types/people.type";

export function peopleReducer(state = [], action) {
  const { type } = action;
  switch (type) {
    case SET_SITTERS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
