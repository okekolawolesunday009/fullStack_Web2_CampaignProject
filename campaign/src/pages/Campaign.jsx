import React from 'react'
import campaigns from '../components/campaigns'
import {calculateBarPercentage} from '../components'
import { CountBox } from '../HOC/CountBox'
import thirdweb from '../Assets/Header/thirdweb.jpg'


const Campaign = () => {

  
  return (

    <div>
      <div className='w-full flex md:flex-row mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={campaigns[0].icon} alt={campaigns[0].name} className='w-full h-[410px] rounded-xl'/>

          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div className='absolute h-full bg-[#4acd8d] '
            style={{width: `${calculateBarPercentage(campaigns[0].target,
              campaigns[0].targetAmount
            )}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className='flex  md:w-[150px] w-full flex-wrap justify-between items-center gap-30px'>
          <CountBox 
          title="Days Left"
          value={campaigns[0].deadline}/>

          <CountBox 
          title={`Raise of ${campaigns[0].target}`}
          value={campaigns[0].target}/>

          <CountBox 
          title="Total Backers"
          value={campaigns[0].amountCollected}/>
          
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
          <div className='flex-[2] flex flex-col gap-[40px]'>
            <div>
                <h4 className='font-epilogue font-semibold text-[18px]
              text-white  rounded-t-[10px] uppercase w-full'>Creator</h4>

              <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
                  <div className=' w-[52] h-[53px] flex items-center justify-center rounded-full bg-[#2c2f32 cursor-pointer'>
                    <img src={thirdweb} alt="user" className='object-contain w-[100%] rounded-full h-[100%]'/>

                  </div>
                  <div>
                    <h4 className='font-epilogue font-semibold text-[14px]
                  text-white breakall'>{campaigns[0].owner}</h4>
                    <p className='mt-[4px] font-epilogue text[#808191] text-[12px] text-[#808191]  font-normal'>10 Campaigns</p>  
                  </div>

              </div>


            </div>


            <div>
                <h4 className='font-epilogue font-semibold text-[18px]
              text-white  rounded-t-[10px] uppercase w-full'>Story</h4>

              <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
                  
                    <p className='mt-[4px] font-epilogue text[#808191] text-[12px] text-[#808191]  font-normal'>{campaigns[0].description} </p>  
              </div>

            </div>


          

            <div>
                <h4 className='font-epilogue font-semibold text-[18px]
              text-white  rounded-t-[10px] uppercase w-full'>Donators</h4>

              <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
                  
                  <div>
                   
                    <p className='mt-[4px] font-epilogue text[#808191] text-[12px] text-[#808191]  font-normal'> No donators yet</p>  
                  </div>

              </div>


            </div>


            <div>
                <h4 className='font-epilogue font-semibold text-[18px]
              text-white  rounded-t-[10px] uppercase w-full'>Funds</h4>

              <div className=' bg-[#28282e] mt-[20px] rounded-2xl flex flex-col p-3 '>
                <h4 className='text-[#808191] text-center'>Fund the campaign</h4>

                <div className=''>
                  <form action="" className='lg:flex-row  flex-col mt-[20px] gap-[10px]'>
                  <input type="number" className='w-[100%] border border-[#808191] text-[#808191] px-3 placeholder:text-[#808191] bg-[#28282e] h-[53px] outline-none rounded-xl '
                  placeholder='Enter amount deposit' />
                  <button className='bg-[#8c6dfd] mt-[20px] p-3 w-full rounded-2xl text-white font-bold'>Fund Campaign</button>


                  </form>


                </div>

              </div>

              
            </div>
          </div>
        </div>
    </div>
  )
}

export default Campaign