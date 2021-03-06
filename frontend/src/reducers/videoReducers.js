import Cookie from 'js-cookie';
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, LIKED_VIDEO_LIST_FAIL, LIKED_VIDEO_LIST_REQUEST, LIKED_VIDEO_LIST_SUCCESS, MY_VIDEO_LIST_FAIL, MY_VIDEO_LIST_REQUEST, MY_VIDEO_LIST_SUCCESS, SUCCESSVID_CHANGE, VIDEO_DETAILS_FAIL, VIDEO_DETAILS_REQUEST, VIDEO_DETAILS_SUCCESS, VIDEO_DISLIKE_FAIL, VIDEO_DISLIKE_REQUEST, VIDEO_DISLIKE_SUCCESS, VIDEO_LIKE_FAIL, VIDEO_LIKE_REQUEST, VIDEO_LIKE_SUCCESS, VIDEO_LIST_FAIL, VIDEO_LIST_REQUEST, VIDEO_LIST_SUCCESS, VIDEO_UPLOAD_FAIL, VIDEO_UPLOAD_REQUEST, VIDEO_UPLOAD_SUCCESS } from '../constants/videoConstants';

function videoUploadReducer(state= {}, action) {
    switch (action.type) {
      case VIDEO_UPLOAD_REQUEST:
        return { loading: true };
      case VIDEO_UPLOAD_SUCCESS:
        return { loading: false, success: true, newVideo:action.payload };
      case VIDEO_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
        case SUCCESSVID_CHANGE:
          return {loading:false, flag:action.payload}
      default:
        return state;
    }
  }


  function videoListReducer(state = { videos: [] }, action) {
    switch (action.type) {
      case VIDEO_LIST_REQUEST:
        return { loading: true, videos: [] };
      case VIDEO_LIST_SUCCESS:
        return { loading: false, videos: action.payload };
      case VIDEO_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }


  function myVideoListReducer(state = { videos: [] }, action) {
    switch (action.type) {
      case MY_VIDEO_LIST_REQUEST:
        return { loading: true, videos: [] };
      case MY_VIDEO_LIST_SUCCESS:
        return { loading: false, videos: action.payload };
      case MY_VIDEO_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function likedVideoListReducer(state = { videos: [] }, action) {
    switch (action.type) {
      case LIKED_VIDEO_LIST_REQUEST:
        return { loading: true, videos: [] };
      case LIKED_VIDEO_LIST_SUCCESS:
        return { loading: false, videos: action.payload };
      case LIKED_VIDEO_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }


  function videoDetailsReducer(state = { video: { Comments: [] } }, action) {
    switch (action.type) {
      case VIDEO_DETAILS_REQUEST:
        return { loading: true };
      case VIDEO_DETAILS_SUCCESS:
        {console.log(action.payload)
        return { loading: false, video: action.payload };}
      case VIDEO_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function videoLikeReducer(state = {}, action) {
    switch (action.type) {
      case VIDEO_LIKE_REQUEST:
        return { loading: true };
      case VIDEO_LIKE_SUCCESS:
        return { loading: false, likes: action.payload };
      case VIDEO_LIKE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function videoDislikeReducer(state = {}, action) {
    switch (action.type) {
      case VIDEO_DISLIKE_REQUEST:
        return { loading: true };
      case VIDEO_DISLIKE_SUCCESS:
        return { loading: false, dislikes: action.payload };
      case VIDEO_DISLIKE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function addCommentVidReducer(state = {}, action) {
    switch (action.type) {
      case ADD_COMMENT_REQUEST:
        return { loading: true };
      case ADD_COMMENT_SUCCESS:
        return { loading: false, data: action.payload };
      case ADD_COMMENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export {videoUploadReducer, videoListReducer, videoDetailsReducer,
     videoLikeReducer, videoDislikeReducer, addCommentVidReducer, myVideoListReducer,likedVideoListReducer}