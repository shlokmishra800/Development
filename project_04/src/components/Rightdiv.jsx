import React from 'react'
import Img from './Img'

const Rightdiv = (props) => {
  
  return (
    <div className='  justify-center item-center h-full  w-2/3 overflow-x-auto flex gap-4 pl-8  mr-5'>
     {props.people.map(function(props){
      return <Img  id={props.id} description={props.description} img={props.img}/>
     })}
    </div>
  )
}

export default Rightdiv
