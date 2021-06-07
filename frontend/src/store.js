import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import {
    userSigninReducer,
    userRegisterReducer,
  } from './reducers/userReducers';

  import{
    addCommentVidReducer,
    likedVideoListReducer,
    myVideoListReducer,
    videoDetailsReducer,
    videoDislikeReducer,
    videoLikeReducer,
    videoListReducer,
    videoUploadReducer
  } from './reducers/videoReducers';

  const userInfo = Cookie.getJSON('userInfo') || null;
  const initialState = {
    userSignin: { userInfo }
  };

  const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    videoUpload : videoUploadReducer,
    videoList : videoListReducer,
    videoDetails: videoDetailsReducer,
    videoLike : videoLikeReducer,
    videoDislike : videoDislikeReducer,
    addCommentVid : addCommentVidReducer,
    myVideoList: myVideoListReducer,
    likedVideoList : likedVideoListReducer,
  });
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
  export default store;