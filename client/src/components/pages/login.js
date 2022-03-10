import React, { useState } from 'react'
import axios from "axios";
import "./Signup.css"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const handleSubmit = event => {
    event.preventDefault();
    axios.post("http://localhost:5000/login", {username, password}).then(res => {console.log(res); console.log(res.data);});
  }
  return(
    <>
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          <p>Username *</p>
          <input type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          <p>Password *</p>
          <input type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <div>
          <button className="submitbutton" type="submit">Login</button>
        </div>
      </form>
      </div>
    </>

    )
}

export default Login;