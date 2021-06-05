import Axios from "axios";
import axios from 'axios';
import Cookie from 'js-cookie';
import { VIDEO_UPLOAD_FAIL, VIDEO_UPLOAD_REQUEST, VIDEO_UPLOAD_SUCCESS } from "../constants/videoConstants";

const uploadVideo = (title,video,description,thumbnail) => async (dispatch, getState) => {
    try {
      dispatch({ type: VIDEO_UPLOAD_REQUEST});
      const {userSignin: { userInfo }} = getState();
        const { data } = await Axios.post('/api/uploads', {title,video,description,thumbnail}, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: VIDEO_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: VIDEO_UPLOAD_FAIL,payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
  };

  export {uploadVideo} 