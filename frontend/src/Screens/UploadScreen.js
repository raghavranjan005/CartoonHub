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


        <form>
            

            <input className="upload-box"></input>

        </form>
       
        </BrowserRouter>
    
      );
    
}

export default UploadScreen;