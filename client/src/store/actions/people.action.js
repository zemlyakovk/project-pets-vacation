import axios from "../../axios/axios";
import { SET_SITTERS } from "../types/people.type";

export const setSitters = () => async (dispatch) => {
  try {
    const result = await axios.get("http://localhost:3100/allSitters")
    dispatch({
      type: SET_SITTERS,
      payload: result.data.allSitters
    })
  } catch (error) {
    console.log(error);
  }
}
