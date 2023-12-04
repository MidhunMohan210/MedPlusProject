  import React from 'react'

function Error({errorMessage}) {
    console.log("errorMessage",errorMessage);
  return (
    <div  className='flex items-center justify-center w-full h-full mt-[150px] '>
        
        <h3  className='text-headingColor text-[20px] leading-[30px] font-semibold ' >{errorMessage}  😥</h3>
      
    </div>
  )
}

export default Error
