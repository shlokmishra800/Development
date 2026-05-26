import React from 'react'
import { ArrowRight } from 'lucide-react';
const Img = (props) => {
  return (
    <div className=' shrink-0 h-full overflow-hidden  '>
      <div className=' rounded-xl w-45   flex-col bg-cover bg-center bg-no-repeat   w full'     style={{ backgroundImage: `url(${props.img})` }}>
     

      <div className=' rounded-xl w-full   flex-col '> 
<span className='text-black  rounded-full px-2 flex flex-col w-6 mt-2 ml-3 py-0.4 h-6  '> <span className='mt-2 bg-white rounded-2xl w-6 h-6 item-center flex justify-center'>{props.id}</span> 
</span>
  </div> 


<div className='flex  mx-2   flex-col mt-30 mr-2 '>     
<p className='tracking-tight font-light text-white mt-9 '>
    {props.description}
      </p>
</div>
<div className='flex justify-between my-3 mr-6 ml-4 mt-6 '>  
     <button className=' bg-blue-600 mb-3 rounded-xl w-15 active:scale-95 pt-0.5 px-1.5 pb-0.5 text-[12px] flex flex-between'> satisfyied  </button>
     <button className='bg-blue-600 rounded-2xl w-6 h-6 active:scale-95 justify-center pt-0.5 flex  '><ArrowRight size={16} /> </button>
</div>
   </div>    
    </div>
  )
}

export default Img
