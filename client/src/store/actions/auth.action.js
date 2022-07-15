import axios from "axios";
import { SET_LOGOUT_USER } from "../types/auth.type";
import { SET_USER_DATA } from "../types/session.type";
// import { checkSuccess } from "./people.action";

export const getUser = () => async dispatch => {
  try {
    const result = await axios.get("http://localhost:3100/login/user", { withCredentials: true });
    dispatch({
      type: SET_USER_DATA,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setLoginData = task => async dispatch => {
  try {
    const result = await axios.post("http://localhost:3100/login", task, { withCredentials: true });
    dispatch({
      type: SET_USER_DATA,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};



export const setRegistr = task => async dispatch => {
  try {
    const result = await axios.post("http://localhost:3100/registration", task, { withCredentials: true });
    dispatch({
      type: SET_USER_DATA,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setLogoutData = task => async dispatch => {
  try {
    const result = await axios.get("http://localhost:3100/logout", { withCredentials: true });

    dispatch({
      type: SET_LOGOUT_USER,
    });
    
    console.log("result.data", result.data);
  } catch (error) {
    console.log(error);
  }
};
