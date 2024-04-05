import React from 'react'
import { useState } from "react";
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.png'

const LeftSidebar = () => {

    const navigateToPublicSpace = () => {
      console.log('Navigating to Public Space');
    };
  
  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
        
        <NavLink to='/' className='side-nav-links' activeClassName='active'>
            <p>Home</p>
        </NavLink>
        
           <div className='side-nav-div'>
               <div><p>PUBLIC</p></div>
              
               <NavLink to='/Questions' className='side-nav-links' activeClassName='active' style={{paddingleft: "40px"}}>
                <img src={Globe} alt="Globe" width={20}/>
                <p style={{paddingLeft: "10px"}}>Questions</p>
               </NavLink>
              
               <NavLink to='/Tags' className='side-nav-links' activeClassName='active' style={{paddingleft: "40px"}} >
                    <p>Tags</p>
               </NavLink>
               
               <NavLink to='/Users' className='side-nav-links' activeClassName='active' style={{paddingleft: "40px"}} >
                  <p>Users</p>
                </NavLink>

                <NavLink to='/Public Space' className='side-nav-links' activeClassName='active' style={{paddingleft: "40px"}} >
  <p>Public Space</p>
</NavLink>

<NavLink
            to="/Weather"
            className="side-nav-links"
            activeClassName="active"
            style={{ paddingleft: "40px" }}
          >
            <p>Weather</p>
          </NavLink>

                
           </div>
      </nav> 
    </div>
  )
}

export default LeftSidebar
