import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SearchBox from '../components/SearchBox';
import { ListMyVideos, ListVideos } from '../actions/videoActions';
import moment from 'moment';

function getIST(dateStr) {
    var theDate = new Date(Date.parse(
      dateStr));

      var IST = theDate.toLocaleString();

      return IST;
    
  }


function MyVideoScreen(props) {

  const myVideoList = useSelector((state) => state.myVideoList);
  const { videos, loading, error } = myVideoList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListMyVideos());

    return () => {
      //
    };
  }, [dispatch]);

  // const sortHandler = (e) => {
  //   setSortOrder(e.target.value);
  //   dispatch(listvideos(category, searchKeyword, sortOrder));
  // };

  return (
    <>
      {/* <marquee className="scroll-text" scrollamount="5" infinite width="98%" direction="left" height="auto">
        These products are just for show and not the original one.
         We will be updating the products between 8-10th of June.
          Register before 10th june and get a coupon voucher of flat ₹100 and 
          chance to get extra rewards after that.
        </marquee> */}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <ul className="videos">
          {videos.map((video) => (
            <li key={video._id}>
              <div className="video">
                <Link to={'/video/' + video._id}>
                  <img
                    className="video-thumbnail"
                    src={video.thumbnail}
                    alt="video"
                  />
                </Link>
                <div className="video-title">
                  <Link to={'/video/' + video._id}>{video.title}</Link>
                </div>
               
                <div className="video-user">
                  {video.user.name}<br></br>{video.views} views &#8226;&nbsp;
                 {moment(getIST(video.createdAt)).format('ll')}</div>
              

              </div>
            </li>
          ))}
        </ul>
      )}
      </>
  );
}
export default MyVideoScreen;
