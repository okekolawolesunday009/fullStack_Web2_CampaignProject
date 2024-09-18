// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, CreateCampaign, Campaign, Profile } from './pages';
import { NavBar, SideBar } from './components';
import Dashboard from './pages/Dashboard';
import { css, StyleSheet } from 'aphrodite';

function App() {
  return (
    //
    <div className="bg-[#13131a] relative sm:-8 p-4  min-h-screen flex flex-row">
      <div className='sm:flex hidden mr-10 relative'>
        <SideBar/>
        </div>

      
      <div className={`flex-1 max:sm:w-full max-w-[1380px] mx-auto sm:pr-5 ${css(styles.container)}`}>
        <NavBar/>
        
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/create-campaign' element={<CreateCampaign/>}></Route>
          <Route path='/campaign-details' element={<Campaign/>}></Route>
          {/* <Route path='/' element={<Home/>}></Route> */}

        </Routes>

      </div>
      
    </div>
  );
}

const styles = StyleSheet.create({
  container:{
  }

})

export default App;
