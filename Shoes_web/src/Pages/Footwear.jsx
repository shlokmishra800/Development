import { Link, Outlet } from "react-router-dom"

const Footwear = () => {
  return (
    <div className="h-full">
   
     
      
      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  )
}

export default Footwear
