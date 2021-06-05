import Cookie from 'js-cookie';
import { VIDEO_UPLOAD_FAIL, VIDEO_UPLOAD_REQUEST, VIDEO_UPLOAD_SUCCESS } from '../constants/videoConstants';

function videoUploadReducer(state= {}, action) {
    switch (action.type) {
      case VIDEO_UPLOAD_REQUEST:
        return { loading: true };
      case VIDEO_UPLOAD_SUCCESS:
        return { loading: false, success: true };
      case VIDEO_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export {videoUploadReducer}