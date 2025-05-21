import React,{useState}from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Signin from "./components/Signin";
import Login from "./components/login";
import User from "./components/User";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
function App() {
   const [jobList, setJobList] = useState([]);
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
         <Route path="/user" element={<User />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;