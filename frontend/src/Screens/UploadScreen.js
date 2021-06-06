import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import CustomLoadingBox from '../components/CustomLoadingBox';
import MessageBox from '../components/MessageBox';
import { uploadVideo } from '../actions/videoActions';
import {successVidchange} from '../actions/videoActions'


const openForm = () => {
  document.getElementById("myForm").style.display = "block";
}

const closeForm = () => {
  document.getElementById("myForm").style.display = "none";
}

const openForm2 = () => {
  document.getElementById("myForm2").style.display = "block";
}

const closeForm2 = () => {
  document.getElementById("myForm2").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("myForm")) {
    document.getElementById("myForm").style.display = "none";
  }
}

function UploadScreen(props) {

  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [thumbnail, setThumbnail] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const uploaded = useSelector(state => state.videoUpload);
  const { loading:loadingVid, success:successVid, error:errorVid , newVideo} = uploaded;

  const uploadThumbnailHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading2(true);
    axios
      .post('/api/uploads/s3-2', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setThumbnail(response.data);
        setUploading2(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading2(false);
      });
  };

  useEffect(() => {

    if (successVid) {
      alert("Video Uploaded Succesfully")
      dispatch(successVidchange());
      props.history.push("/");

      }
    return () => {
      //
    };
  }, [successVid]);

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('video', file);
    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        closeForm();
        openForm2();
        setVideo(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const dispatch = useDispatch();

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(uploadVideo(title,video,description, thumbnail));
  };


    if(!userInfo)
      props.history.push("/signin");

    return (

        <BrowserRouter>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox>{error}</MessageBox>}
        <div className="row center large">
            <h1 className="large"> Dashboard</h1>
        </div>

        <div class="card-box">

          <img className="upload-cartoon" src="https://cartoonhub.s3.ap-south-1.amazonaws.com/upload-video.png"></img>
          <p className="card-box-p">Create, Upload and publish a video<br></br> to get started.</p>

          <button class="open-button" onClick={() => openForm()}>UPLOAD VIDEO</button>
        </div>

        <div class="form-popup" id="myForm">
                <ul>
              </ul>
              <form  class="form-container-pop" >
                <div className="pop-up-header">
                <span class="close" onClick={() => closeForm()}>&times;</span>
              <h2>Upload Video</h2>
              </div>
              
                <label className="upload-logo">
                  <i className="fa fa-upload"></i>
                  <input type="file" onChange={uploadFileHandler}></input>
                  </label>
                  <p className="card-box-p"><br></br>Drag and drop your video file to upload </p>
                  <button className="open-button-2">SELECT FILE</button>
                  {uploading && <CustomLoadingBox>Uploading Video ....</CustomLoadingBox>}
                  
              
              <p className="card-box-p-2">Uploaded Videos will be public as of now. We will soon come up with private section.</p>


              </form>
      </div>
       

      
      <div class="form-popup" id="myForm2" onSubmit={submitHandler}>
                <ul>
              </ul>
              <form  class="form-container-pop" >
                <div className="pop-up-header">
                <span class="close" onClick={() => closeForm2()}>&times;</span>
                {loadingVid && <LoadingBox></LoadingBox>}
                {errorVid && <MessageBox variant="danger">{error}</MessageBox>}
              <h2>Upload Video</h2>
              </div>
                <ul>
                  <li>
                    <label>Title</label><br></br>
                    <input type="text" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} ></input>
                  </li>
                  <li>
                  <label>Description</label><br></br>
                   <textarea placeholder="Description" rows="6" cols="50" id="description" value={description} onChange={(e) => {setDescription(e.target.value)}} />
                  </li>
                  <li>
                    <label className="upload-thumbnail"><i className="fa fa-plus" ></i>
                    <br></br><p className="thumb-p">Thumbnail</p>
                    <input type="file" onChange={uploadThumbnailHandler}></input>
                    </label>
                  </li>
                  {uploading2 && <CustomLoadingBox>Uploading Thumbnails....</CustomLoadingBox>}
                </ul>
                <button className="open-button-2" type="submit">Upload</button>
              


              </form>
      </div>




        </BrowserRouter>
    
      );
    
}

export default UploadScreen;