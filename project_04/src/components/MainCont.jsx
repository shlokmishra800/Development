import React from 'react'
import Nav from './Nav'
import Left from './Left'


import Rightdiv from './Rightdiv'

const MainCont = (props) => {
  console.log(props.id);
  
  return (
    <div className=''>
      <Nav />
    
      <div className='flex  mt-7 h-full w-2/3 gap-6 ml-3 overflow-x-auto'>
        <Left />
     <Rightdiv  people={props.people}/>
      </div>
    </div>
  )
}

export default MainCont
