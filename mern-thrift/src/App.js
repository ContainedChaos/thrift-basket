import './App.css';
import React from 'react';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  //const [ user, setLoginUser] = useState({})

  return (
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element = {<Homepage />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/register" element = {<Register />} />
        </Routes> */}
        <App />
      </BrowserRouter>
  );
}

export default App;
