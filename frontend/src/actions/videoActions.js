import Axios from "axios";
import axios from 'axios';
import Cookie from 'js-cookie';
import { ADD_COMMENT_FAIL, ADD_COMMENT_SUCCESS, LIKED_VIDEO_LIST_FAIL, LIKED_VIDEO_LIST_REQUEST, LIKED_VIDEO_LIST_SUCCESS, MY_VIDEO_LIST_FAIL, MY_VIDEO_LIST_REQUEST, MY_VIDEO_LIST_SUCCESS, SUCCESSVID_CHANGE, VIDEO_DETAILS_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS,
  VIDEO_DISLIKE_FAIL,
  VIDEO_DISLIKE_REQUEST,
  VIDEO_DISLIKE_SUCCESS,
  VIDEO_LIKE_FAIL,
  VIDEO_LIKE_REQUEST,
  VIDEO_LIKE_SUCCESS,
   VIDEO_LIST_FAIL, VIDEO_LIST_REQUEST, VIDEO_LIST_SUCCESS, VIDEO_UPLOAD_FAIL, 
   VIDEO_UPLOAD_REQUEST, VIDEO_UPLOAD_SUCCESS } from "../constants/videoConstants";

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



  const ListVideos =()=>async(dispatch,getState)=>{

    dispatch({type:VIDEO_LIST_REQUEST});
    try {
      const {data} = await axios.get('/api/videos');
      dispatch({type:VIDEO_LIST_SUCCESS,payload:data});
    } catch (error) {
      dispatch({ type: VIDEO_LIST_FAIL, payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message, });
    }
};

const ListMyVideos =()=>async(dispatch,getState)=>{

  dispatch({type:MY_VIDEO_LIST_REQUEST});
  try {
    console.log("lala")
    const {userSignin: { userInfo }} = getState();
    const { data } = await axios.get(`/api/users/myvideo`,{
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({type:MY_VIDEO_LIST_SUCCESS,payload:data});
  } catch (error) {
    dispatch({ type: MY_VIDEO_LIST_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const ListLikedVideos =()=>async(dispatch,getState)=>{

  dispatch({type:LIKED_VIDEO_LIST_REQUEST});
  try {
    const {userSignin: { userInfo }} = getState();
    const { data } = await axios.get(`/api/users/likedvideo`,{
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({type:LIKED_VIDEO_LIST_SUCCESS,payload:data});
  } catch (error) {
    dispatch({ type: LIKED_VIDEO_LIST_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};



const detailsVideo = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_DETAILS_REQUEST, payload: videoId });
    const { data } = await axios.get('/api/videos/' + videoId);
    dispatch({ type: VIDEO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEO_DETAILS_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const likeVideo = (videoId) => async (dispatch, getState) => {
  try {
    dispatch({ type: VIDEO_LIKE_REQUEST});
    const {userSignin: { userInfo }} = getState();
        const { data } = await axios.put(`/api/videos/like`,{videoId},{
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
    dispatch({ type: VIDEO_LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEO_LIKE_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const dislikeVideo = (videoId) => async (dispatch, getState) => {
  try {
    dispatch({ type: VIDEO_DISLIKE_REQUEST});
    const {userSignin: { userInfo }} = getState();
        const { data } = await axios.put('/api/videos/dislike',{videoId}, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
    dispatch({ type: VIDEO_DISLIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEO_DISLIKE_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const addComments = (comment, videoId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_COMMENT_SUCCESS});
    const {userSignin: { userInfo }} = getState();
        const { data } = await axios.post('/api/videos/addcomment',{comment, videoId}, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
      console.log(data)
    dispatch({ type: ADD_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_COMMENT_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });
  }
};

const successVidchange = () => async(dispatch) => {
  dispatch({ type: SUCCESSVID_CHANGE, payload:false});
}


  export {uploadVideo, ListVideos, detailsVideo, successVidchange, 
    likeVideo, dislikeVideo,addComments, ListLikedVideos, ListMyVideos} 