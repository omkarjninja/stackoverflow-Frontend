import React from 'react'
import { Routes,Route, } from 'react-router-dom';
import { useState } from "react";

import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import PublicSpace from './pages/PublicSpace/PublicSpace'
import Weather from "./pages/user-weather/weather";



const AllRoutes = () => {
  const [lati, setlati] = useState("10");
  const [long, setlong] = useState("20");
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const showPosition = (position) => {
    setlati(position.coords.latitude);
    setlong(position.coords.longitude);
  };
  getLocation();
  return (
    <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/Auth' element={<Auth/>} />
      <Route  path='/AskQuestion' element={<AskQuestion/>} />
      <Route  path='/Questions' element={<Questions/>} />
      <Route  path='/Questions/:id' element={<DisplayQuestion/>} />
      <Route  path='/Tags' element={<Tags />} />
      <Route  path='/Users' element={<Users />} />
      <Route  path='/User/:id' element={<UserProfile />} />
      <Route
        path="/Weather"
        element={<Weather latitude={lati} longitude={long}></Weather>}
      />
      <Route  path='/Public Space' element={<PublicSpace />} />
      
      
       
      
    </Routes>
  )
}

export default AllRoutes
