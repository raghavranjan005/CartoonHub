import Axios from "axios";
import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_FLAG_CHANGE } from "../constants/userConstants";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST});
   
    try {
      const { data } = await Axios.post("/api/users/register", {name,email,password});
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

  
  export {register, flagchange} 