import React from 'react'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Componets/Auth/Login/Login";
import SignIn from "./Componets/Auth/SignIN/SignIn";

import Home from "./Componets/Home/Home";

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signIn" element={<SignIn/>} />
          <Route path="/home" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
