import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import LeftSidebar from "../../Compents/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Compents/RightSidebar/RightSidebar";
import HomeMainbar from "../../Compents/HomeMainbar/HomeMainbar";

const Home = () => {
  var time = new Date();
  const hour = time.getHours();
  const [climate, setClimate] = useState("yo");
  // if (time.getHours() < 6) {
  //   // alert("hello");
  //   setClimate("yos");
  // } else if (hour < 12) {
  //   setClimate("hey");
  // } else {
  //   setClimate("yo");
  // }
  useEffect(() => {
    if (time.getHours() < 6) {
      // alert("hello");
      setClimate("yos");
    } else if (hour < 18) {
      setClimate("hey");
    } else {
      setClimate("yo");
    }
  }, []);
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className={`home-container-2 ${climate}`}>
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
