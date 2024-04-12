import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Navbar from './Compents/Navbar/Navbar'
import AllRoutes from './AllRoutes' 
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import { Route, Routes } from 'react-router-dom';
import PublicSpace from './pages/PublicSpace/PublicSpace';
import Chat from './Compents/Chat/Chat'




function App() {
  var time = new Date();

  const hour = time.getHours();
 const dispatch = useDispatch();

 const [climate,setClimate] = useState("yo");
 
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers())
    if(time.getHours()<6){
      setClimate("yos");
    }else if(hour<18){
      setClimate("hey");
    }else{
      setClimate("yo");
    }
  }, [dispatch])
  return (
    <div className={`App ${climate}`}>
      <Router>
       <Navbar/>
       <Routes>
          <Route path="/public-space" element={<PublicSpace />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
       
       <AllRoutes />
       <Chat />
       </Router>
    </div>
  );
}

function NotFoundPage() {
  return <div>This is StackOverFlow WebSite</div>;
}


export default App;

