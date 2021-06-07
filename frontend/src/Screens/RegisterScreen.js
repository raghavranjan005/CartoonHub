import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {register, flagchange} from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import axios from 'axios';


function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState('')
    const userRegister = useSelector(state => state.userRegister);
    const { loading, flag, error } = userRegister;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (flag) {
        dispatch(flagchange());
        props.history.push("/signin");

        }
      }, [flag]);

    // //console.log(User);
    // //console.log("hello");
    
    const showPassword = (x) => {

        var x = document.getElementById("password");
        if (x.type === "password") {
        x.type = "text";
        } else {
        x.type = "password";
    }
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (password !== rePassword) {
          alert('Password and confirm password are not match');
        } else{
          dispatch(register(name, email, password, image));
        }
      };

      const uploadImageHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
          .post('/api/uploads/s3-2', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setImage(response.data);
            setUploading(false);
          })
          .catch((err) => {
            //console.log(err);
            setUploading(false);
          });
      };


    return <div className="form">
        <form onSubmit={submitHandler}>
        <div className="col-2 leftpad">
            <img src="https://cartoonhub.s3.ap-south-1.amazonaws.com/Copy+of+Cartoon+HUB.png" className="signinlogo"></img>
        </div>
            <ul className = "form-container-register">
                <li>
                    <h2> Create a CartoonHub Account</h2>
                    </li>
                    
                    {loading && <LoadingBox ></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                   

                    <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}></input>
                    </li>

                    <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}></input>
                    </li>

                    <li>
                    <label>
                        Profile pic <i className="fa fa-file"></i>
                        <input type="file"  required onChange={uploadImageHandler}></input> &nbsp;&nbsp;
                        <input type="text" required value={image} onChange={(e) => setImage(e.target.value)}></input>
                        
                    </label>
                    
                    </li>
                <li>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                    <p>Show Password <input type="checkbox" className="checkbox" onClick={() => showPassword()}/></p>
                </li>

                <li>
                <label htmlFor="rePassword">Confirm Password</label>
                    <input type="Password" id="rePassword" name="rePassword" required onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                

                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                
                <li>
                    Already have an account? <Link to= "/signin"  >Sign-In</Link>
                </li>


            </ul>

        </form>
    </div>
}


export default RegisterScreen;