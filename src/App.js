import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react';
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
 const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers())
  }, [dispatch])
  return (
    <div className="App">
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
  return <div>Page not found</div>;
}


export default App;
