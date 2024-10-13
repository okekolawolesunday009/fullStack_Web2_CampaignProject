import React from 'react';
import CustomButton from '../components/CustomButton';
import hero from '../Assets/hero.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const handleNavLink = (link) => {
    // navigate(`/${link}`)


  }
  return (
    <main className='h-screen'>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-[40px]">
          <div className='flex-1'>
            <img src={hero} className='w-[300px] md:w-[600px] rounded-2xl' alt="hero" />
          </div>

          <div className='flex flex-col items-center md:items-start'>
            <h1 className='text-white mb-[20px] text-center md:text-left text-3xl md:text-5xl font-bold'>
              Create Your First Campaign
            </h1>

            <div className="flex gap-[20px] mt-[20px]">
              <Link to='/login'>
              <CustomButton
                btnType="button"
                title={'Login'}
                styles={`bg-[#1dc071]`}
                // handleClick={handleNavLink("title")}
              />
              
              </Link>

              <Link to='/signup'>
              <CustomButton
                btnType="button"
                title={'Signup'}
                styles={`bg-[#1dc071]`}
                // handleClick={handleNavLink("signup")}
              />
              
              </Link>

             
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
