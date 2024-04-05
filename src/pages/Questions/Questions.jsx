import React from 'react'


import '../../App.css'
import LeftSidebar from '../../Compents/LeftSidebar/LeftSidebar'
import RightSidebar from '../../Compents/RightSidebar/RightSidebar'
import HomeMainbar from '../../Compents/HomeMainbar/HomeMainbar'

const Questions = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
       <HomeMainbar />
       <RightSidebar />
      </div>
    </div>
  )
}

export default Questions