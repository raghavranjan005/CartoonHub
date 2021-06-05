import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const openForm = () => {
  document.getElementById("myForm").style.display = "block";
}

const closeForm = () => {
  document.getElementById("myForm").style.display = "none";
}


function UploadScreen(props) {


    return (

        <BrowserRouter>
        <div className="row center large">
            <h1 className="large"> Dashboard</h1>
        </div>

        <div class="card-box">

          <img className="upload-cartoon" src="https://cartoonhub.s3.ap-south-1.amazonaws.com/upload-video.png"></img>
          <p className="card-box-p">Create, Upload and publish a video<br></br> to get started.</p>

          <button class="open-button" onClick={() => openForm()}>Upload Video</button>
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
                  <input type="file"></input>
                  </label>
                  <p className="card-box-p"><br></br>Drag and drop your video file to upload </p>
                  <button className="open-button">Enter File</button>
                  
              
              


              </form>
      </div>
       
        </BrowserRouter>
    
      );
    
}

export default UploadScreen;