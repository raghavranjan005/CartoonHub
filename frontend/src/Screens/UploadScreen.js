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
            <h1 className="large"><i className="fa fa-upload"></i> Upload Video</h1>
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
              <span class="close" onClick={() => closeForm()}>&times;</span>
              <h1>Add Coupons</h1>

              <label for="couponCode"><b>Coupon Code</b></label> &nbsp;
              <input type="text" id="couponCode" />

              <br></br><br></br>
              <label for="discount"><b>Discount amount</b></label> &nbsp;
              <input type="number" id="discount" />
              <br></br><br></br>
              <label for="couponUsers"><b>Add Email Id of users</b></label>
              <input  id="couponUsers"/> &nbsp;
              <button type="button">Add</button>
              <br></br><br></br>

              <button type="submit" class="btn">Submit</button>


              </form>
      </div>
       
        </BrowserRouter>
    
      );
    
}

export default UploadScreen;