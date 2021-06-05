import Cookie from 'js-cookie';
import { USER_FLAG_CHANGE, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstants';


function userRegisterReducer(state = {flag:false}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, flag: action.payload };
      case USER_REGISTER_FAIL:
        {console.log(action.payload)
        return { loading: false, error: action.payload };}
      case USER_FLAG_CHANGE:
        return {loading:false, flag:action.payload}
      default: return state;
    }
  }


  function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case USER_SIGNIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default: return state;
    }
  }


  export{userRegisterReducer, userSigninReducer}