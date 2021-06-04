import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';


const openMenu = () => {
  document.querySelector('.sidebar').classList.add('open');
};
const closeMenu = () => {
  document.querySelector('.sidebar').classList.remove('open');
};

function App(props) {


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
        <Link to="/"><img src="cartoonhub-logo.png" className="main-com-logo" alt="AtranZ" font-color="white"/></Link>
        </div>

        {/* <div className="header-links">
            {/* <a href="/cart">
            <span>
              <i className='fa fa-shopping-bag'></i>
            </span>
             &nbsp;
              My Bag
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            
            </a> */}
             {/* {userInfo ? (
              <Link to="/cart"> 
              <span>
              <i className='fa fa-shopping-bag'></i>
              </span>
              &nbsp;My Bag              
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
              </Link>
            ) : (
              <Link to="/signin">
              <span>
              <i className='fa fa-shopping-bag'></i>
            </span>
             &nbsp;My Bag</Link>
            )} */}
            
            {/* {userInfo ? (
              <div className="dropdown">
                <Link to="/profile">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>

                  <li>
                    <Link to="/orderhistory">My Orders</Link>
                  </li>

                  <li>
                    <Link to="/" onClick={handleLogout} >Logout</Link>
                  </li>

                </ul>
              </div>
            )  : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div> */}

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

      
            
            <Route path="/category/:id" component={HomeScreen} />
            
            
            
            
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
