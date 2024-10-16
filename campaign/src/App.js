// import logo from './logo.svg';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, CreateCampaign, Campaign, Profile, Login, Signup } from './pages';
import { isTokenValid, NavBar, SideBar } from './components';
import Dashboard from './pages/Dashboard';
import { css, StyleSheet } from 'aphrodite';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  SignupRequest, logout, loginRequest,  displayNotificationDrawer, hideNotificationDrawer } from './actions/ui/uiActionCreators';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCampaignRequest, fetchCampaignRequest, updateCampaignRequest } from './actions/campaign/campaignActionCreators';




export class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    

    };
  
  }
  componentDidMount() {
    // Check token validity on component mount
    const token = localStorage.getItem('token');

    if (token) {
      const isValid = isTokenValid(token); // Assume isTokenValid is a function that verifies the token
      if (isValid) {
        this.setState({ loggedIn: true });
      
      }
    }
  }

  render () {
    const { loggedIn } = this.state;

  const {login, isLoggedIn, displayDrawer,
    logout, signup, fetchCampaign, 
    displayNotificationDrawer, 
    hideNotificationDrawer,
    updateCampaign,
    addCampaign
  } = this.props;



  
    return (
    //
    <div className="bg-[#13131a] relative sm:p-8 p-4  min-h-screen flex flex-row">
      <div className='sm:flex hidden mr-10 relative'>
        {isLoggedIn  && <SideBar logout={logout}  /> }
        </div>
      
      <div className={`flex-1 max:sm:w-full max-w-[1380px] mx-auto sm:pr-5`}>
      {isLoggedIn && <NavBar 
      displayDrawer={displayDrawer}
      displayNotificationDrawer = {displayNotificationDrawer}
      hideNotificationDrawer = {hideNotificationDrawer}
      />}
        
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/profile' element={isLoggedIn ? <Profile/> : <Navigate to="/login"/>}></Route>
          <Route path='/campaign/new' element={isLoggedIn ? <CreateCampaign addCampaign={addCampaign}/> : <Navigate to="/login"/>}></Route>
          {/* <Route path='/campaign/:id' element={isLoggedIn ? <CreateCampaign addCampaign={addCampaign}/> : <Navigate to="/login"/>}></Route> */}
          <Route path='/campaign/update/:id' element={isLoggedIn ? <CreateCampaign addCampaign={addCampaign} updateCampaign={updateCampaign}/> : <Navigate to="/login"/>}></Route>
          <Route path='/campaign/:id' element={<Campaign/>}></Route>
          <Route path='/login' element={!isLoggedIn ? <Login login={login} loginState={isLoggedIn} /> : <Navigate to="/dashboard" />} />
          <Route path='/signup' element={!isLoggedIn ? <Signup signup={signup} /> : <Navigate to="/dashboard" />} />
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />

        {/* <Route path='/dashboard' element={<Dashboard />} />

                <Route path='/' element={<Home/>}></Route> */}

        </Routes>

      </div>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          // pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
         />
      
      
    </div>
      )
    }

}
App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  logout: PropTypes.func.isRequired, // Assuming you're using PropTypes for prop type validation,
  displayNotificationDrawer: PropTypes.func.isRequired ,
  hideNotificationDrawer: PropTypes.func.isRequired 
};
App.defaultProps = {
  login: () => {},
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.ui.isUserLoggedIn,
    displayDrawer: state.ui.isNotificationDrawerVisible,
  };
  
};
export const mapDispatchToProps = {
displayNotificationDrawer,
hideNotificationDrawer,
login:loginRequest,
signup:SignupRequest,
logout: logout,
addCampaign: addCampaignRequest,
updateCampaign: updateCampaignRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App)