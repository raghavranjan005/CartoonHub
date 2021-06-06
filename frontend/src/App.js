import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import UploadScreen from './Screens/UploadScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SigninScreen from './Screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/userActions';
import SearchBox from './components/SearchBox';


const openMenu = () => {
  document.querySelector('.sidebar').classList.add('open');
};
const closeMenu = () => {
  document.querySelector('.sidebar').classList.remove('open');
};


function App(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }
  return (

    <BrowserRouter>
    <div className="grid-container">
    <header className="row header">
      <div className="brand">
        <button className="open-sidebar" onClick = {openMenu}>
        <i className="fa fa-bars"></i>
        </button>
      </div>
      <div className="logo">
        <Link to="/"><img src="https://cartoonhub.s3.ap-south-1.amazonaws.com/cartoonhub-logo.png" className="main-com-logo" alt="Cartoon Hub" font-color="white"/></Link>
        </div>
        <ul className="filter">
          <li>
          <SearchBox></SearchBox>
          </li>
        </ul>
        <div className="header-links">
          <ul>
          <li>
          {userInfo ? (
              <div className="dropdown">
                <Link to="/dashboard">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/upload">Upload Video</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout} >Logout</Link>
                  </li>

                </ul>
              </div>
            )  : (
              <Link to="/signin">Sign In</Link>
            )}
          </li>
          </ul>
        </div>

    </header> 
    <aside className = "sidebar">
        <div className="Hello-container">
        {/* <strong className="Hello"><i className="fa fa-user-circle"></i>&thinsp;Hello {userInfo && `, ${userInfo.name}`}!</strong> */}
          <button className = "close-side-bar" onClick = {closeMenu}>
            <i className="fa fa-close"></i>
          </button>
        </div>
        <ul className="categories">
        <li>
        <strong>Shopping categories</strong>
        </li>
          {/* <Link to = "/category/saree">saree</Link>
          <Link to = "/category/suit">suit</Link> */}




        <hr></hr>

      </ul>

      

    </aside>
    <main className="main">
      <div className="content">

      
            
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/upload" component={UploadScreen}/>
            <Route path="/register" component={RegisterScreen}/>
            <Route path="/signin" component={SigninScreen}/>
            
            
            
      </div>
    </main>
        <footer className="footer">
          © 2021 Cartoon Hub     
        </footer>

     
 





    </div>
   
   
    </BrowserRouter>

  );
}

export default App;
