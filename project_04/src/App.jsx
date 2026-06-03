import React from 'react'
import MainCont from './components/MainCont'


const App = (props) => {

const people = [
  {
    id: 1,
    name: "Alice Johnson",
    img: "https://tse2.mm.bing.net/th/id/OIP.-G6To837UZ-rf9OcXuPxsgAAAA?pid=Api&P=0&h=180",
    description: "Experienced financial analyst delivering insights, strategies, and growth for corporate success."
  },
  {
    id: 2,
    name: "Brian Smith",
    img: "https://tse4.mm.bing.net/th/id/OIP.Gnx1s0P8-xApb1wqrN9g8AAAAA?pid=Api&P=0&h=180",
    description: "Creative marketing specialist crafting campaigns, boosting engagement, and driving measurable results."
  },
  {
    id: 3,
    name: "Catherine Lee",
    img: "https://tse2.mm.bing.net/th/id/OIP.so5s5QgNUgKSgouiR2R1zQHaHa?pid=Api&P=0&h=180",
    description: "Dedicated software engineer building scalable applications, solving problems, and optimizing performance."
  },
  {
    id: 4,
    name: "David Kim",
    img: "https://tse1.mm.bing.net/th/id/OIP.44yTnDw6h6BMqFXn0Zb7nAHaHa?pid=Api&P=0&h=180",
    description: "Innovative product manager aligning vision, strategy, and execution for successful product launches."
  },
  {
    id: 5,
    name: "Ella Martinez",
    img: "https://tse3.mm.bing.net/th/id/OIP.v0S0RoVHAZsy6TE91oFGdgHaE7?pid=Api&P=0&h=180",
    description: "Skilled UX designer creating intuitive interfaces, enhancing usability, and improving customer satisfaction."
  },
  {
    id: 6,
    name: "Frank Wilson",
    img: "https://tse4.mm.bing.net/th/id/OIP.1fSOarut6ZP1Ob2TcQyXtwHaHa?pid=Api&P=0&h=180",
    description: "Professional data scientist analyzing trends, building models, and delivering actionable business insights."
  },
  {
    id: 7,
    name: "Grace Patel",
    img: "https://tse2.mm.bing.net/th/id/OIP.zY5vkY80kzB69Q4gzqIsjwHaLH?pid=Api&P=0&h=180",
    description: "Strategic HR consultant fostering talent, improving culture, and driving organizational transformation."
  },


   {
    id: 8,
    title: "Business Consultant",
    description: "Provides strategic advice, optimizes operations, and helps organizations achieve sustainable growth.",
    img: "https://tse4.mm.bing.net/th/id/OIP.aozZVJMEEAxsU50aTRcZIAHaHa?pid=Api&P=0&h=180"
  },
  {
    id: 9,
    title: "Cybersecurity Expert",
    description: "Safeguards digital assets, prevents breaches, and ensures compliance with security standards.",
    img: "https://tse4.mm.bing.net/th/id/OIP.K14mGSYki76_DkhKhHLtLgHaHa?pid=Api&P=0&h=180g"
  },
  {
    id: 10,
    title: "HR Specialist",
    description: "Manages talent acquisition, employee engagement, and fosters a positive workplace culture.",
    img: "https://tse4.mm.bing.net/th?id=OIF.sxy7a%2b5zR9XGc4w8nxYwPw&pid=Api&P=0&h=180"
  },
  {
    id: 11,
    title: "Operations Manager",
    description: "Oversees daily workflows, streamlines processes, and ensures efficiency across departments.",
    img: "https://tse1.mm.bing.net/th?id=OIF.BSc6VJXCKm%2fW6N%2fcRzwW8Q&pid=Api&P=0&h=180"
  },
  {
    id: 12,
    title: "Product Designer",
    description: "Creates innovative product concepts, balances aesthetics with functionality, and drives user satisfaction.",
    img: "https://tse1.mm.bing.net/th/id/OIF.vrWeVo0PnBnQbjVXrZeVdg?pid=Api&P=0&h=180g"
  }

]







  return (
    <div className='flex mr-7 overflow-hidden'>

      <MainCont people={people}/> 
 

    
    </div>
  )
}

export default App
