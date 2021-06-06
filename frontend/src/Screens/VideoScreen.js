import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {signin} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


function VideoScreen(props){

    const dispatch = useDispatch();


    return (
        <>
        <div className="row top">
          <div className = "details-video col-2">
        <video className="video-player" src="https://cartoonhub.s3.amazonaws.com/10%20Second%20Animation%20Practice%20%20%2301.mp4" controls></video>
            </div>
        </div>

        </>
    )
}


export default VideoScreen;