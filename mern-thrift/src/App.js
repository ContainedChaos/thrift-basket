import './App.css';
import React from 'react';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Homepage /> */}
      <Login />
      {/* <Register /> */}
    </div>
  );
}

export default App;
