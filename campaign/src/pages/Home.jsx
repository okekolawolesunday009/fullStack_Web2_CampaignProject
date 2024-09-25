import React from 'react'
import CustomButton from '../components/CustomButton'
import blenda from '../Assets/blenda.png'

const Home = () => {
  // useStateContext()
  // const fetchCampaings = async () => {
  //   setIsLoading(true);
  //   const data = await getCampigns();
  //   setCampaigns(data);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   if(contract) fetchCampaings();

  // }, address, contract)
   return (
    <main className=''>
      <div className="m-auto flex flex-col gap-[20px] items-center justify-center">
        
          <h1 className='text-white'> Create Your First Campaign</h1>

          <div className=" flex gap-[20px]">
            <CustomButton
            btnType="button"
            title={'login'}
            styles = {`bg-[#1dc071]`}                  


          />

          <CustomButton
            btnType="button"
            title={'signup'}
            styles = {`bg-[#1dc071]`}                  


          />
        </div>
      </div>
      
    </main>
  )
}

export default Home