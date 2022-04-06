import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Learn from './components/pages/Learn';
import Signup from './components/pages/Signup';
import Play from './components/pages/Play';
import LearnInfo from './components/pages/LearnInfo';
import PageNotFound from './components/pages/PageNotFound';
import Login from './components/pages/login';
import UserProfile from "./components/pages/UserProfile.js"
import { useState, useEffect } from "react";
const axios = require("axios");

function App() { 
  const [username, setUsername] = useState(undefined); 
  useEffect(() => {
    if(localStorage.getItem("token") === null) {
      setUsername(undefined);
    } else {
      axios.get("http://localhost:5000/isuserauth", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then((res) => {
          setUsername(res.data.username);
      }).catch((error) => {
          console.log(error);
      })
    }
  }, [username])
  return (
    <>
      <Router>
        <Navbar username={username}/>
        <Routes>
          <Route path="/"  element={<Home/>}/> 
          <Route  path="/learn" element={<Learn/>}/>
          <Route  path="/sign-up" element={<Signup/>}/>
          <Route  path="/play" element={<Play/>}/>
          <Route path="/LearnInfo/:piece" element={<LearnInfo/>}/>
          <Route path="/how-to-play" element={<LearnInfo/>}/>
          <Route path="/openings" element={<LearnInfo/>}/>
          <Route path="/famous-games" element={<LearnInfo/>}/>
          <Route  path="/404" element={<PageNotFound/>}/>
          <Route  path="/login" element={<Login/>}/>
          <Route path='/user/:id' element={<UserProfile/>}/>
        </Routes>
      </Router>

    </>
  );
}

export default App;
