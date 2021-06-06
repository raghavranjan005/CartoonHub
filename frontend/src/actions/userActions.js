import Axios from "axios";
import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_LOGOUT } from "../constants/userConstants";
import { USER_SIGNIN_FAIL } from "../constants/userConstants";
import { USER_SIGNIN_REQUEST } from "../constants/userConstants";
import { USER_SIGNIN_SUCCESS } from "../constants/userConstants";
import { USER_FLAG_CHANGE } from "../constants/userConstants";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const register = (name, email, password, image) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST});
   
    try {
      const { data } = await Axios.post("/api/users/register", {name,email,password, image});
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const flagchange = () => async(dispatch) => {
    dispatch({ type: USER_FLAG_CHANGE, payload:false});
  }

  const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("/api/users/signin", { email, password});
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload:
        error.response && error.response.data.message 
          ? error.response.data.message
          : error.message, });
    }
  }


  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT });
  }

  
  export {register, flagchange, signin, logout } 