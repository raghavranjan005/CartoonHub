import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


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
  const [uploading, setUploading] = useState(false);

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;


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

    if(!userInfo)
      props.history.push("/signin");

    return (

        <BrowserRouter>
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
                  
              
              <p className="card-box-p-2">Uploaded Videos will be public as of now. We will soon come up with private section.</p>


              </form>
      </div>
       

      
      <div class="form-popup" id="myForm2">
                <ul>
              </ul>
              <form  class="form-container-pop" >
                <div className="pop-up-header">
                <span class="close" onClick={() => closeForm2()}>&times;</span>
              <h2>Upload Video</h2>
              </div>
              
              <form >
                <ul>
                  <li>
                    <label>Video URL</label>
                    <input type="text" name="video" value={video} onChange={(e) => setVideo(e.target.value)} ></input>
                  </li>
                  
                </ul>
                </form>
              
              <p className="card-box-p-2">Uploaded Videos will be public as of now. We will soon come up with private section.</p>


              </form>
      </div>




        </BrowserRouter>
    
      );
    
}

export default UploadScreen;