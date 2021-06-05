import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';


function UploadScreen(props) {


    return (

        <BrowserRouter>
        <div className="row center large">
            <h1 className="large"><i className="fa fa-upload"></i> Upload Video</h1>
        </div>

        <div class="card-box">

          <img className="upload-cartoon" src="https://cartoonhub.s3.ap-south-1.amazonaws.com/upload-video.png"></img>
          <p className="card-box-p">Create, Upload and publish a video<br></br> to get started.</p>

          <button class="open-button" >Upload Video</button>
        </div>
       
        </BrowserRouter>
    
      );
    
}

export default UploadScreen;