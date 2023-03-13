import './App.css';

import React from 'react';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';

// import login_components from './components/login_component';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


// import LOGIN_COMPONENT from './components/login_component/login_component';
// import UserDetails from './components/userDetails/userDetails';




function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/homepage" element={<Homepage/>}/>
          
          {/* <Route path = "/users/:id/verify/:token" element = {<EmailVerify/>}/> */}
       
       
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;

