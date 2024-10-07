import React from 'react'

export const CountBox = ({title, value}) => {
  return (
    <div className='flex flex-col justify-center text-center items-center w-[150px]'>
        <h4 className='font-epilogue font-bold text-[30px]
        text-white p-3 bg-[#1c1c24 rounded-t-[10px] w-full'>{value}</h4>
        <p className='bg-[#28282e] px-3 py-2 w-full text-[#808191] text-[16px]
        font-normal rounded-b-[10px]'>{title}</p>


    </div>
  )
}
