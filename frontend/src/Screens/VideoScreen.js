import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {signin} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { detailsVideo, dislikeVideo, likeVideo, addComments } from '../actions/videoActions';
import moment from 'moment';

function getIST(dateStr) {
    var theDate = new Date(Date.parse(
      dateStr));

      var IST = theDate.toLocaleString();

      return IST;
    
  }

  function copy(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert( `Copied URL = ${text}`)
  }


function VideoScreen(props){

    const videoId = props.match.params.id;
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const videoDetails = useSelector((state) => state.videoDetails);
    const { video, loading, error } = videoDetails;

    const videoLikes = useSelector((state) => state.videoLike);
    const { likes, loading:LoadingLike, error:errorLike } = videoLikes;

    const videoDislikes = useSelector((state) => state.videoDislike);
    const { dislikes, loading:LoadingDislike, error:errorDislike } = videoDislikes;

    const addComment = useSelector((state) => state.addCommentVid);
    const { data, loading:LoadingComment, error:errorComment } = addComment;

    const [comment, setComment] = useState(''); 

    const increaseLike = (id)=>{
        if(userInfo)
            dispatch(likeVideo(id));
        else{
            alert("You must Sign-In")
        }
      };

      const decreaseLike = (id)=>{
        if(userInfo)
            dispatch(dislikeVideo(id));
        else{
            alert("You must Sign-In")
        }
      };

    const commentSubmit = (e)=>{
        e.preventDefault();
        dispatch(addComments(comment,videoId));
    }

      
    useEffect(() => {

        dispatch(detailsVideo(props.match.params.id));
        return () => {
          //
        };
      }, [LoadingLike, LoadingDislike,data]);


    return (
        <>
        {loading && <LoadingBox></LoadingBox>} 
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {video?(    
        <div className="row top">
          <div className = "details-video col-2">    
            <video className="video-player" src={video.videoURL} controls></video>
            <div className="video-details-des">
            <h1>{video.title}</h1>
            <p className="views">{video.views} views &#8226; {moment(getIST(video.createdAt)).format('ll')}
            <i className="border-bottom">
                <i className="fa fa-thumbs-o-up" onClick={() => increaseLike(video._id)}> {video.likes}&nbsp;&nbsp;</i>
                
             <i className="fa fa-thumbs-o-down" onClick={() => decreaseLike(video._id)}> {video.dislikes}</i>&nbsp;&nbsp;
             </i>
             <i className="fa fa-share" onClick={() => copy("http://localhost:3000/video/"+video._id)}></i> SHARE
             
             </p>
            </div>
            <div className="video-deails-description">
            <div className="video-title-2">
                <img src={video.thumbnail} className="avtar"></img> &nbsp;
                  {video.title}
            </div>
            <div className="description">
                  {video.description}
                </div>
                </div>

            <div className="comment">
            <img src={video.thumbnail} className="avtar"></img> &nbsp;
            <form onSubmit={commentSubmit}>
            <input type="text" placeholder="Add a public comment..." className="comment-input" required
            onChange={(e) => setComment(e.target.value)}></input>
            <button type="submit" className="comment-button">Submit</button>
            </form>
            </div>

            <div className="comment-list">
                {video.comments.length === 0 && <p>There is no comment yet.</p>}
                    {video.comments && 
                    
                    <ul>
                        {video.comments.map((comm) => (
                        <li key={comm._id}>
                        
                       <div className="comment-title"><img src={video.thumbnail} className="avtar"></img> &nbsp;&nbsp;
                       {comm.name}</div>
                        <div className="comment-user">{comm.comment}</div>
                             </li>
                            ))}
                    </ul>
                    }

            </div>

        </div>
        </div>
        ):<></>}
        </>
    )
}


export default VideoScreen;